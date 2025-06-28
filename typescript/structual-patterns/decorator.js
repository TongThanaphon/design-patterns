// Concrete Notifier implementations
class EmailNotifier {
  send(message) {
    console.log(`Sending email with message: ${message}`);
  }
}

// Decorator base class
class NotifierDecorator {
  constructor(notifier) {
    this.notifier = notifier;
  }

  send(message) {
    this.notifier.send(message);
  }
}

class SMSNotifierDecorator extends NotifierDecorator {
  send(message) {
    super.send(message);
    console.log(`Sending SMS with message: ${message}`);
  }
}

class SlackNotifierDecorator extends NotifierDecorator {
  send(message) {
    super.send(message);
    console.log(`Sending Slack message with message: ${message}`);
  }
}

function clientCode(notifier) {
  notifier.send("Hello, World!");
}

const emailNotifier = new EmailNotifier();
clientCode(emailNotifier);

console.log("---------");

const smsNotifier = new SMSNotifierDecorator(emailNotifier);
const slackNotifier = new SlackNotifierDecorator(smsNotifier);

clientCode(slackNotifier);
