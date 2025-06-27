trait Target {
    fn request(&self) -> String;
}

pub struct OrdinaryTarget;

impl Target for OrdinaryTarget {
    fn request(&self) -> String {
        "Ordinary request".to_string()
    }
}

struct Adaptee;

impl Adaptee {
    fn specific_request(&self) -> String {
        ".tseuqer cificepS".to_string()
    }
}

struct Adapter {
    adaptee: Adaptee
}

impl Adapter {
    fn new(adaptee: Adaptee) -> Self {
        Self { adaptee }
    }
}

impl Target for Adapter {
    fn request(&self) -> String {
        self.adaptee.specific_request().chars().rev().collect::<String>()
    }
}

fn call<T: Target>(target: T) {
    println!("{}", target.request());
}

fn main() {
    let target = OrdinaryTarget;
    call(target);

    let adaptee = Adaptee;
    println!("{}", adaptee.specific_request());

    let adapter = Adapter::new(adaptee);
    call(adapter);
}
