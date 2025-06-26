var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LogisticsFactory = /** @class */ (function () {
    function LogisticsFactory() {
    }
    LogisticsFactory.prototype.operation = function () {
        var transport = this.createTransport();
        return transport.deliver();
    };
    return LogisticsFactory;
}());
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Truck.prototype.createTransport = function () {
        return new Truck();
    };
    Truck.prototype.deliver = function () {
        return "Delivering by land";
    };
    return Truck;
}(LogisticsFactory));
var Train = /** @class */ (function (_super) {
    __extends(Train, _super);
    function Train() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Train.prototype.createTransport = function () {
        return new Train();
    };
    Train.prototype.deliver = function () {
        return "Delivering by rail";
    };
    return Train;
}(LogisticsFactory));
var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ship.prototype.createTransport = function () {
        return new Ship();
    };
    Ship.prototype.deliver = function () {
        return "Delivering by sea";
    };
    Ship.prototype.operation = function () {
        return "I will manage to deliver by sea";
    };
    return Ship;
}(LogisticsFactory));
function clientCode(factory) {
    console.log(factory.operation());
}
clientCode(new Truck()); // Delivering by land
clientCode(new Ship()); // Delivering by sea
clientCode(new Train()); // Delivering by rail
