trait Database {
    fn operation(&self);
}

struct RealDatabase;

impl Database for RealDatabase {
    fn operation(&self) {
        println!("Performing operation on the real database.");
    }
}

struct ProxyDatabase {
    real_database: RealDatabase,
}

impl ProxyDatabase {
    fn new() -> Self {
        ProxyDatabase {
            real_database: RealDatabase,
        }
    }

    fn check_access(&self) -> bool {
        println!("Checking access permissions.");

        true
    }
}

impl Database for ProxyDatabase {
    fn operation(&self) {
        if self.check_access() {
            println!("Access granted. Delegating operation to the real database.");
            self.real_database.operation();
        } else {
            println!("Access denied.");
        }
    }
}

fn call(service: &dyn Database) {
    service.operation();
}

fn main() {
    let db = RealDatabase;
    let proxy = ProxyDatabase::new();

    call(&db);

    println!("-------");

    call(&proxy);
}
