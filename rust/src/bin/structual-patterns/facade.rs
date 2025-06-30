use std::ops::{SubAssign};

struct Account {
    name: String
}

impl Account {
    fn new(name: &str) -> Self {
        Self {
            name: name.to_string()
        }
    }

    fn check_name(&self, name: &str) -> bool {
        self.name == name
    }
}

struct Wallet {
    balance: f32
}

impl Wallet {
    fn new() -> Self {
        Self {
            balance: 0.0
        }
    }

    fn deposit(&mut self, amount: f32) {
        self.balance += amount;
    }

    fn withdraw(&mut self, amount: f32) {
        self.balance.sub_assign(amount);
    }

    fn get_balance(&self) -> f32 {
        self.balance
    }
}

struct SecurityCode {
    code: String
}

impl SecurityCode {
    fn new(code: &str) -> Self {
        Self {
            code: code.to_string()
        }
    }

    fn check_code(&self, code: &str) -> bool {
        self.code == code
    }
}

struct Notification;

impl Notification {
    fn notify(&self, message: &str) {
        println!("Notification: {}", message);
    }
}

struct WalletFacade {
    account: Account,
    wallet: Wallet,
    security_code: SecurityCode,
    notification: Notification
}

impl WalletFacade {
    fn new(name: &str, code: &str) -> Self {
        Self {
            account: Account::new(name),
            wallet: Wallet::new(),
            security_code: SecurityCode::new(code),
            notification: Notification
        }
    }

    fn deposit(&mut self, name: &str, code: &str, amount: f32) {
        if self.account.check_name(name) && self.security_code.check_code(code) {
            self.wallet.deposit(amount);
            self.notification.notify(&format!("Deposited {} to {}'s wallet.", amount, name));
        } else {
            println!("Invalid account name or security code.");
        }
    }

     fn withdraw(&mut self, name: &str, code: &str, amount: f32) {
        if self.account.check_name(name) && self.security_code.check_code(code) {
            if self.wallet.get_balance() >= amount {
                self.wallet.withdraw(amount);
                self.notification.notify(&format!("Withdrew {} from {}'s wallet.", amount, name));
            } else {
                println!("Insufficient balance.");
            }
        } else {
            println!("Invalid account name or security code.");
        }
     }

     fn get_balance(&self, name: &str, code: &str) -> f32 {
        if self.account.check_name(name) && self.security_code.check_code(code) {
            self.wallet.get_balance()
        } else {
            println!("Invalid account name or security code.");
            0.0
        }
    }
}

fn main() {
   let mut wallet = WalletFacade::new("John", "1234");

    wallet.deposit("John", "1234", 100.0);
    wallet.deposit("John", "2222", 20.0);
    wallet.withdraw("John", "1234", 10.0);
    println!("Current balance: {}", wallet.get_balance("John", "1234"));
}