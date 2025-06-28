interface Notifier {
  send(message: string): void;
}

// Concrete Notifier implementations
class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending email with message: ${message}`);
  }
}

// Decorator base class
class NotifierDecorator implements Notifier {
  protected notifier: Notifier;

  constructor(notifier: Notifier) {
    this.notifier = notifier;
  }

  send(message: string): void {
    this.notifier.send(message);
  }
}

class SMSNotifierDecorator extends NotifierDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`Sending SMS with message: ${message}`);
  }
}

class SlackNotifierDecorator extends NotifierDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`Sending Slack message with message: ${message}`);
  }
}

function clientCode(notifier: Notifier) {
  notifier.send("Hello, World!");
}

const emailNotifier = new EmailNotifier();
clientCode(emailNotifier);

console.log("---------");

const smsNotifier = new SMSNotifierDecorator(emailNotifier);
const slackNotifier = new SlackNotifierDecorator(smsNotifier);

clientCode(slackNotifier);
