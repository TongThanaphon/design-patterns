class Database {
    private static instance: Database;

    private constructor() {}

    public static getInstance(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }

        return this.instance;
    }
}

function clientCode() {
    const db1 = Database.getInstance();
    const db2 = Database.getInstance();

    console.log(db1 === db2); // true, both variables point to the same instance
}

clientCode();