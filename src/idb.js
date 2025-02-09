export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("CostManagerDB", 2); // שדרוג גרסה ל-2

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("costs")) {
                db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
            } else {
                const store = event.target.transaction.objectStore("costs");
                if (!store.indexNames.contains("date")) {
                    store.createIndex("date", "date", { unique: false });
                }
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const addCostToDB = async (cost) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("costs", "readwrite");
        const store = transaction.objectStore("costs");
        const request = store.add(cost);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const getCostsByMonth = async (month, year) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("costs", "readonly");
        const store = transaction.objectStore("costs");
        const request = store.getAll();

        request.onsuccess = () => {
            const results = request.result.filter((cost) => {
                const costDate = new Date(cost.date);
                return costDate.getMonth() + 1 === month && costDate.getFullYear() === year;
            });
            resolve(results);
        };

        request.onerror = () => reject(request.error);
    });
};
