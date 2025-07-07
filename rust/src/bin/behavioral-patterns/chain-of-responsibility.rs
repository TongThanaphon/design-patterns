trait Handler {
    fn next(&self) -> Option<&Box<dyn Handler>>;
    fn handle(&self, request: &str) -> &str;
}

#[derive(Default)]
struct MonkeyHandler {
    next: Option<Box<dyn Handler>>,
}

impl MonkeyHandler {
    fn new(next: Option<Box<dyn Handler>>) -> Self {
        MonkeyHandler { next }
    }
}

impl Handler for MonkeyHandler {
    fn next(&self) -> Option<&Box<dyn Handler>> {
        self.next.as_ref()
    }

    fn handle(&self, request: &str) -> &str {
        if request == "Banana" {
            return "Monkey: I'll eat the banana.";
        }

        if let Some(next_handler) = self.next() {
            return next_handler.handle(request);
        }

        "No handler found for this request."
    }
}


#[derive(Default)]
struct SquirrelHandler {
    next: Option<Box<dyn Handler>>,
}

impl SquirrelHandler {
    fn new(next: Option<Box<dyn Handler>>) -> Self {
        SquirrelHandler { next }
    }
}

impl Handler for SquirrelHandler {
    fn next(&self) -> Option<&Box<dyn Handler>> {
        self.next.as_ref()
    }

    fn handle(&self, request: &str) -> &str {
        if request == "Nut" {
            return "Squirrel: I'll eat the nut.";
        }

        if let Some(next_handler) = self.next() {
            return next_handler.handle(request);
        }

        "No handler found for this request."
    }
}


#[derive(Default)]
struct DogHandler {
    next: Option<Box<dyn Handler>>,
}

impl DogHandler {
    fn new(next: Option<Box<dyn Handler>>) -> Self {
        DogHandler { next }
    }
}

impl Handler for DogHandler {
    fn next(&self) -> Option<&Box<dyn Handler>> {
        self.next.as_ref()
    }

    fn handle(&self, request: &str) -> &str {
        if request == "Bone" {
            return "Dog: I'll eat the bone.";
        }

        if let Some(next_handler) = self.next() {
            return next_handler.handle(request);
        }

        "No handler found for this request."
    }
}


fn main() {
    let dog = DogHandler::default();
    let squirrel = SquirrelHandler::new(Some(Box::new(dog)));
    let monkey = MonkeyHandler::new(Some(Box::new(squirrel)));

    let requests = vec!["Banana", "Nut", "Fish"];

    for request in requests {
        let response = monkey.handle(request);
        println!("Request: {}, Response: {}", request, response);
    }
}