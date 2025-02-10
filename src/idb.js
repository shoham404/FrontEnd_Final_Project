export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("CostManagerDB", 2);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("costs")) {
                db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const addCostToDB = async (cost) => {
    try {
        if (!cost.sum || isNaN(cost.sum) || Number(cost.sum) <= 0) {
            throw new Error("Invalid sum: Must be a positive number.");
        }

        if (!cost.category || !cost.description) {
            throw new Error("Missing required fields: category and description are required.");
        }

        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("costs", "readwrite");
            const store = transaction.objectStore("costs");
            const request = store.add(cost);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(new Error(`Failed to add cost: ${event.target.error}`));
        });
    } catch (error) {
        console.error("Error in addCostToDB:", error.message);
        throw error;
    }
};

export const getCostsByMonth = async (month, year) => {
    try {
        if (!month || !year) {
            throw new Error("Month and year must be provided.");
        }

        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("costs", "readonly");
            const store = transaction.objectStore("costs");
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result.filter((cost) => {
                    if (!cost.date) {
                        console.warn("Skipping cost entry without date:", cost);
                        return false;
                    }
                    const costDate = new Date(cost.date);
                    return costDate.getMonth() + 1 === month && costDate.getFullYear() === year;
                });

                console.log("Fetched data:", results);
                resolve(results);
            };

            request.onerror = (event) => reject(new Error(`Failed to retrieve costs: ${event.target.error}`));
        });
    } catch (error) {
        console.error("Error in getCostsByMonth:", error.message);
        throw error;
    }
};


