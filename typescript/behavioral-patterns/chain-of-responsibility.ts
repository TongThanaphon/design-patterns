interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {
  private nexthandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nexthandler = handler;
    return handler;
  }

  public handle(request: string): string | null {
    if (this.nexthandler) {
      return this.nexthandler.handle(request);
    }

    return null;
  }
}

class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === "Banana") {
      return `Monkey: I'll eat the ${request}.`;
    }

    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}.`;
    }

    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === "Meat") {
      return `Dog: I'll eat the ${request}.`;
    }

    return super.handle(request);
  }
}

function clientCode(handler: Handler) {
  const foods = ["Banana", "Nut", "Fish"];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(result);
    } else {
      console.log(`${food} was left untouched.`);
    }
  }
}

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

console.log("Chain: Monkey > Squirrel > Dog\n");
clientCode(monkey);

console.log("\nSubchain: Squirrel > Dog\n");
clientCode(squirrel);
