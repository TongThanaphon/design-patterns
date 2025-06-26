var PrimeVandal = /** @class */ (function () {
    function PrimeVandal() {
    }
    PrimeVandal.prototype.shoot = function () {
        console.log("Shooting with Prime Vandal");
    };
    return PrimeVandal;
}());
var PrimePhantom = /** @class */ (function () {
    function PrimePhantom() {
    }
    PrimePhantom.prototype.shoot = function () {
        console.log("Shooting with Prime Phantom");
    };
    PrimePhantom.prototype.anotherWeapon = function (weapon) {
        console.log("😱😱😱");
        weapon.shoot();
        console.log("Using another weapon with Prime Phantom");
    };
    return PrimePhantom;
}());
var ReaverVandal = /** @class */ (function () {
    function ReaverVandal() {
    }
    ReaverVandal.prototype.shoot = function () {
        console.log("Shooting with Reaver Vandal");
    };
    return ReaverVandal;
}());
var ReaverPhantom = /** @class */ (function () {
    function ReaverPhantom() {
    }
    ReaverPhantom.prototype.shoot = function () {
        console.log("Shooting with Reaver Phantom");
    };
    ReaverPhantom.prototype.anotherWeapon = function (weapon) {
        console.log("😱😱😱");
        weapon.shoot();
        console.log("Using another weapon with Reaver Phantom");
    };
    return ReaverPhantom;
}());
var PrimeSkinWeaponFactory = /** @class */ (function () {
    function PrimeSkinWeaponFactory() {
    }
    PrimeSkinWeaponFactory.prototype.createVandal = function () {
        return new PrimeVandal();
    };
    PrimeSkinWeaponFactory.prototype.createPhantom = function () {
        return new PrimePhantom();
    };
    return PrimeSkinWeaponFactory;
}());
var ReaverSkinWeaponFactory = /** @class */ (function () {
    function ReaverSkinWeaponFactory() {
    }
    ReaverSkinWeaponFactory.prototype.createVandal = function () {
        return new ReaverVandal();
    };
    ReaverSkinWeaponFactory.prototype.createPhantom = function () {
        return new ReaverPhantom();
    };
    return ReaverSkinWeaponFactory;
}());
function clientCode(factory) {
    var vandal = factory.createVandal();
    var phantom = factory.createPhantom();
    vandal.shoot();
    phantom.shoot();
    phantom.anotherWeapon(vandal);
}
clientCode(new PrimeSkinWeaponFactory());
clientCode(new ReaverSkinWeaponFactory());
