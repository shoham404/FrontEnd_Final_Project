// Function to open the IndexedDB database
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("CostManagerDB", 2); // Open or upgrade the database

        // Handle database upgrade - create object store if it does not exist
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("costs")) {
                db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });  // Create store with auto-increment ID
            }
        };

        // Handle successful database opening
        request.onsuccess = () => resolve(request.result);

        // Handle errors during database opening
        request.onerror = () => reject(request.error);
    });
};

// Function to add a new cost entry to the database
export const addCostToDB = async (cost) => {
    try {
        // Validate input: sum must be a positive number, category and description are required
        if (!cost.sum || isNaN(cost.sum) || Number(cost.sum) <= 0) {
            throw new Error("Invalid sum: Must be a positive number.");
        }

        if (!cost.category || !cost.description) {
            throw new Error("Missing required fields: category and description are required.");
        }

        const db = await openDB(); // Open the database
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("costs", "readwrite"); // Start a transaction
            const store = transaction.objectStore("costs"); // Access the object store
            const request = store.add(cost); // Add cost entry to the store

            // Handle successful addition
            request.onsuccess = () => resolve(request.result);

            // Handle errors during addition
            request.onerror = (event) => reject(new Error(`Failed to add cost: ${event.target.error}`));
        });
    } catch (error) {
        console.error("Error in addCostToDB:", error.message);
        throw error;
    }
};

// Function to fetch costs by a specific month and year
export const getCostsByMonth = async (month, year) => {
    try {
        // Validate input: month and year must be provided
        if (!month || !year) {
            throw new Error("Month and year must be provided.");
        }

        const db = await openDB(); // Open the database
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("costs", "readonly"); // Start a read-only transaction
            const store = transaction.objectStore("costs"); // Access the object store
            const request = store.getAll(); // Retrieve all entries

            request.onsuccess = () => {
                // Filter results based on the selected month and year
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

            // Handle errors during retrieval
            request.onerror = (event) => reject(new Error(`Failed to retrieve costs: ${event.target.error}`));
        });
    } catch (error) {
        console.error("Error in getCostsByMonth:", error.message);
        throw error;
    }
};


