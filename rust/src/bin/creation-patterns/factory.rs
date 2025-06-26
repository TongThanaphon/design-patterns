trait Transport {
    fn deliver(&self) -> String;
}

trait Logistics {
    fn create_transport(&self) -> Box<dyn Transport>;

    fn operation(&self) {
        let transport = self.create_transport();

        println!("{}", transport.deliver());
    }
}

struct Truck;

impl Transport for Truck {
    fn deliver(&self) -> String {
        String::from("Delivering by land")
    }
}

struct Train;

impl Transport for Train {
    fn deliver(&self) -> String {
        String::from("Delivering by rail")
    }
}

struct Ship;

impl Transport for Ship {
    fn deliver(&self) -> String {
        String::from("Delivering by sea")
    }
}

struct LandLogistics {
    transport_type: String,
}

impl LandLogistics {
    fn new(transport_type: &str) -> Self {
        Self {
            transport_type: transport_type.to_string(),
        }
    }
}

impl Logistics for LandLogistics {
    fn create_transport(&self) -> Box<dyn Transport> {
        match self.transport_type.as_str() {
            "Truck" => Box::new(Truck),
            "Train" => Box::new(Train),
            _ => panic!("Unknown transport type for land logistics"),
        }
    }
}

struct SeaLogistics;

impl Logistics for SeaLogistics {
    fn create_transport(&self) -> Box<dyn Transport> {
        Box::new(Ship)
    }

    fn operation(&self) {
        println!("I will manage to deliver by sea")
    }
}

fn logistic_factory(logistic_type: &str) -> Box<dyn Logistics> {
    match logistic_type {
        "Truck" => Box::new(LandLogistics::new("Truck")) as Box<dyn Logistics>,
        "Train" => Box::new(LandLogistics::new("Train")) as Box<dyn Logistics>,
        "Ship" => Box::new(SeaLogistics) as Box<dyn Logistics>,
        _ => panic!("Unknown logistics type"),
    }
}

fn main() {
    let truck = logistic_factory("Truck");
    truck.operation();

    let ship = logistic_factory("Ship");
    ship.operation();

    let train = logistic_factory("Train");
    train.operation();
}
