use std::sync::{Arc, OnceLock};

struct Database;

impl Database {
    fn get_instance() -> Arc<Database> {
        static INSTANCE: OnceLock<Arc<Database>> = OnceLock::new();
        INSTANCE.get_or_init(|| Arc::new(Database)).clone()
    }
}

fn main() {
    let instance1 = Database::get_instance();
    let instance2 = Database::get_instance();

    // Both instances should point to the same database instance
    assert!(Arc::ptr_eq(&instance1, &instance2));

    println!("Singleton pattern implemented successfully.");
}
