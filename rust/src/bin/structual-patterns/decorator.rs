trait Notifier {
    fn send(&self, message: &str);
}

struct EmailNotifier;

impl Notifier for EmailNotifier {
    fn send(&self, message: &str) {
        println!("Sending email with message: {}", message);
    }
}

struct NotifierDecorator<T: Notifier> {
    notifier: T
}

impl<T: Notifier> NotifierDecorator<T> {
    fn new(notifier: T) -> Self {
        Self { notifier }
    }
}

impl<T: Notifier> Notifier for NotifierDecorator<T> {
    fn send(&self, message: &str) {
        self.notifier.send(message);
    }
}

struct SMSNotifierDecorator<T: Notifier> {
    base: NotifierDecorator<T>
}

impl<T: Notifier> SMSNotifierDecorator<T> {
    fn new(notifier: T) -> Self {
        Self {
            base: NotifierDecorator::new(notifier)
        }
    }
}

impl<T: Notifier> Notifier for SMSNotifierDecorator<T> {
    fn send(&self, message: &str) {
        self.base.send(message);
        println!("Sending SMS with message: {}", message);
    }
}

struct SlackNotifierDecorator<T: Notifier> {
    base: NotifierDecorator<T>
}

impl<T: Notifier> SlackNotifierDecorator<T> {
    fn new(notifier: T) -> Self {
        Self {
            base: NotifierDecorator::new(notifier)
        }
    }
}

impl<T: Notifier> Notifier for SlackNotifierDecorator<T> {
    fn send(&self, message: &str) {
        self.base.send(message);
        println!("Sending Slack message with content: {}", message);
    }
}

fn client_code(notifier: &impl Notifier) {
    notifier.send("Hello, World!");
}

fn main() {
    let email_notifier = EmailNotifier;
    println!("== Basic email notifier ==");
    client_code(&email_notifier);

    let sms_notifier = SMSNotifierDecorator::new(email_notifier);
    println!("== Email + SMS ==");
    client_code(&sms_notifier);

    let slack_notifier = SlackNotifierDecorator::new(sms_notifier);
    println!("== Email + SMS + Slack ==");
    client_code(&slack_notifier);
}