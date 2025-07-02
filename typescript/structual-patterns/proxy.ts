interface IDatabase {
    operation(): void;
}

class Database implements IDatabase {
    operation(): void {
        console.log("Database service operation executed.");
    }
}

class DatabaseProxy implements IDatabase {
    private service: Database

    constructor(service: Database) {
        this.service = service;
    }

    operation(): void {
        if (this.checkAccess()) {
            console.log("Proxy: Access granted. Executing operation.");
            this.service.operation();
        } else {
            console.log("Proxy: Access denied. Operation not executed.");
        }
    }

    checkAccess(): boolean {
        // Simulate access control logic
        console.log("Proxy: Checking access permissions.");
        return true; // Assume access is granted for simplicity
    }
}

function clientCode(service: IDatabase) {
    service.operation();
}

const database = new Database();
const proxy = new DatabaseProxy(database);

clientCode(proxy); // Using the proxy to access the database service

console.log("-----------")

clientCode(database); // Directly using the database service