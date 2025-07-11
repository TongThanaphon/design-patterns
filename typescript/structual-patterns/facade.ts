class Account {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  checkName(name: string): boolean {
    return this.name === name;
  }
}

class Wallet {
  private balance: number;

  constructor() {
    this.balance = 0;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      console.log("Insufficient balance");
    }
  }

  getBalance(): number {
    return this.balance;
  }
}

class SecurityCode {
  private code: string;

  constructor(code: string) {
    this.code = code;
  }

  checkCode(code: string): boolean {
    return this.code === code;
  }
}

class MyNotification {
  notify(message: string): void {
    console.log(`Notification: ${message}`);
  }
}

class WalletFacade {
  private account: Account;
  private wallet: Wallet;
  private securityCode: SecurityCode;
  private notification: MyNotification;

  constructor(name: string, code: string) {
    this.account = new Account(name);
    this.wallet = new Wallet();
    this.securityCode = new SecurityCode(code);
    this.notification = new MyNotification();
  }

  deposit(name: string, code: string, amount: number): void {
    if (this.account.checkName(name) && this.securityCode.checkCode(code)) {
      this.wallet.deposit(amount);
      this.notification.notify(`Deposited ${amount} to ${name}'s wallet.`);
    } else {
      console.log("Invalid account name or security code.");
    }
  }

  withdraw(name: string, code: string, amount: number): void {
    if (this.account.checkName(name) && this.securityCode.checkCode(code)) {
      this.wallet.withdraw(amount);
      this.notification.notify(`Withdrew ${amount} from ${name}'s wallet.`);
    } else {
      console.log("Invalid account name or security code.");
    }
  }

  getBalance(name: string, code: string): number {
    if (this.account.checkName(name) && this.securityCode.checkCode(code)) {
      return this.wallet.getBalance();
    } else {
      console.log("Invalid account name or security code.");
      return 0;
    }
  }
}

function clientCode(wallet: WalletFacade) {
  wallet.deposit("John", "1234", 100);
  wallet.deposit("John", "2222", 20);

  wallet.withdraw("John", "1234", 50);

  console.log(`Current balance: ${wallet.getBalance("John", "1234")}`);
}

const wallet = new WalletFacade("John", "1234");
clientCode(wallet);
