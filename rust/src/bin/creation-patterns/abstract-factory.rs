trait Vandal {
    fn shoot(&self);
}

trait Phantom {
    fn shoot(&self);
    fn another_weapon(&self, weapon: &dyn Vandal);
}

trait WeaponFactory {
    fn create_vandal(&self) -> Box<dyn Vandal>;
    fn create_phantom(&self) -> Box<dyn Phantom>;
}

struct PrimeVandal;

impl Vandal for PrimeVandal {
    fn shoot(&self) {
        println!("Shooting with Prime Vandal!");
    }
}

struct PrimePhantom;

impl Phantom for PrimePhantom {
    fn shoot(&self) {
        println!("Shooting with Prime Phantom!");
    }

    fn another_weapon(&self, weapon: &dyn Vandal) {
        println!("Using another weapon:");
        weapon.shoot();
    }
}

struct ReaverVandal;

impl Vandal for ReaverVandal {
    fn shoot(&self) {
        println!("Shooting with Reaver Vandal!");
    }
}

struct ReaverPhantom;

impl Phantom for ReaverPhantom {
    fn shoot(&self) {
        println!("Shooting with Reaver Phantom!");
    }

    fn another_weapon(&self, weapon: &dyn Vandal) {
        println!("Using another weapon:");
        weapon.shoot();
    }
}

struct PrimeSkinWeaponFactory;

impl WeaponFactory for PrimeSkinWeaponFactory {
    fn create_vandal(&self) -> Box<dyn Vandal> {
        Box::new(PrimeVandal)
    }

    fn create_phantom(&self) -> Box<dyn Phantom> {
        Box::new(PrimePhantom)
    }
}

struct ReaverSkinWeaponFactory;

impl WeaponFactory for ReaverSkinWeaponFactory {
    fn create_vandal(&self) -> Box<dyn Vandal> {
        Box::new(ReaverVandal)
    }

    fn create_phantom(&self) -> Box<dyn Phantom> {
        Box::new(ReaverPhantom)
    }
}

fn skin_factory(skin: &str) -> Box<dyn WeaponFactory> {
    match skin {
        "prime" => Box::new(PrimeSkinWeaponFactory),
        "reaver" => Box::new(ReaverSkinWeaponFactory),
        _ => panic!("Unknown skin type!"),
    }
}

fn main() {
    let prime_weapon = skin_factory("prime");

    let vandal = prime_weapon.create_vandal();
    let phantom = prime_weapon.create_phantom();

    vandal.shoot();
    phantom.shoot();
    phantom.another_weapon(vandal.as_ref());

    let reaver_weapon = skin_factory("reaver");

    let phantom2 = reaver_weapon.create_phantom();

    phantom2.another_weapon(vandal.as_ref());
}
