class Account {
  constructor(name) {
    this.name = name;
  }

  checkName(name) {
    return this.name === name;
  }
}

class Wallet {
  constructor() {
    this.balance = 0;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      console.log("Insufficient balance");
    }
  }

  getBalance() {
    return this.balance;
  }
}

class SecurityCode {
  constructor(code) {
    this.code = code;
  }

  checkCode(code) {
    return this.code === code;
  }
}

class MyNotification {
  notify(message) {
    console.log(`Notification: ${message}`);
  }
}

class WalletFacade {
  constructor(name, code) {
    this.account = new Account(name);
    this.wallet = new Wallet();
    this.securityCode = new SecurityCode(code);
    this.notification = new MyNotification();
  }

  deposit(name, code, amount) {
    if (this.account.checkName(name) && this.securityCode.checkCode(code)) {
      this.wallet.deposit(amount);
      this.notification.notify(`Deposited ${amount} to ${name}'s wallet.`);
    } else {
      console.log("Invalid account name or security code.");
    }
  }

  withdraw(name, code, amount) {
    if (this.account.checkName(name) && this.securityCode.checkCode(code)) {
      this.wallet.withdraw(amount);
      this.notification.notify(`Withdrew ${amount} from ${name}'s wallet.`);
    } else {
      console.log("Invalid account name or security code.");
    }
  }

  getBalance(name, code) {
    if (this.account.checkName(name) && this.securityCode.checkCode(code)) {
      return this.wallet.getBalance();
    } else {
      console.log("Invalid account name or security code.");
      return 0;
    }
  }
}

function clientCode(wallet) {
  wallet.deposit("John", "1234", 100);
  wallet.deposit("John", "2222", 20);

  wallet.withdraw("John", "1234", 50);

  console.log(`Current balance: ${wallet.getBalance("John", "1234")}`);
}

const wallet = new WalletFacade("John", "1234");
clientCode(wallet);
