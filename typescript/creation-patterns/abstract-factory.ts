interface Vandal {
    shoot(): void;
}

interface Phantom {
    shoot(): void;
    anotherWeapon(weapon: Vandal): void;
}

interface WeaponFactory {
    createVandal(): Vandal;
    createPhantom(): Phantom;
}

class PrimeVandal implements Vandal {
    shoot(): void {
        console.log("Shooting with Prime Vandal");
    }
}

class PrimePhantom implements Phantom {
    shoot(): void {
        console.log("Shooting with Prime Phantom");
    }

    anotherWeapon(weapon: Vandal): void {
        console.log("😱😱😱");
        weapon.shoot();
        console.log("Using another weapon with Prime Phantom");
    }
}

class ReaverVandal implements Vandal {
    shoot(): void {
        console.log("Shooting with Reaver Vandal");
    }
}

class ReaverPhantom implements Phantom {
    shoot(): void {
        console.log("Shooting with Reaver Phantom");
    }

    anotherWeapon(weapon: Vandal): void {
        console.log("😱😱😱");
        weapon.shoot();
        console.log("Using another weapon with Reaver Phantom");
    }
}

class PrimeSkinWeaponFactory implements WeaponFactory {
    createVandal(): Vandal {
        return new PrimeVandal();
    }
    
    createPhantom(): Phantom {
        return new PrimePhantom();
    }
}

class ReaverSkinWeaponFactory implements WeaponFactory {
    createVandal(): Vandal {
        return new ReaverVandal();
    }

    createPhantom(): Phantom {
        return new ReaverPhantom();
    }
}

function clientCode(factory: WeaponFactory) {
    const vandal = factory.createVandal();
    const phantom = factory.createPhantom();

    vandal.shoot();
    phantom.shoot();
    phantom.anotherWeapon(vandal);
}

clientCode(new PrimeSkinWeaponFactory());
clientCode(new ReaverSkinWeaponFactory());