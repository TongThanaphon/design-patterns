var Database = /** @class */ (function () {
    function Database() {
    }
    Database.getInstance = function () {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    };
    return Database;
}());
function clientCode() {
    var db1 = Database.getInstance();
    var db2 = Database.getInstance();
    console.log(db1 === db2); // true, both variables point to the same instance
}
clientCode();
