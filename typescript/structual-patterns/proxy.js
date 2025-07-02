var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.operation = function () {
        console.log("Database service operation executed.");
    };
    return Database;
}());
var DatabaseProxy = /** @class */ (function () {
    function DatabaseProxy(service) {
        this.service = service;
    }
    DatabaseProxy.prototype.operation = function () {
        if (this.checkAccess()) {
            console.log("Proxy: Access granted. Executing operation.");
            this.service.operation();
        }
        else {
            console.log("Proxy: Access denied. Operation not executed.");
        }
    };
    DatabaseProxy.prototype.checkAccess = function () {
        // Simulate access control logic
        console.log("Proxy: Checking access permissions.");
        return true; // Assume access is granted for simplicity
    };
    return DatabaseProxy;
}());
function clientCode(service) {
    service.operation();
}
var database = new Database();
var proxy = new DatabaseProxy(database);
clientCode(proxy); // Using the proxy to access the database service
console.log("-----------");
clientCode(database); // Directly using the database service
