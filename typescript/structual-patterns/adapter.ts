class Target {
  public request(): string {
    return "Target: The default behavior.";
  }
}

class Adaptee {
  public specificRequest(): string {
    return ".eetpadA eht fo tcerroc a si sihT";
  }
}

class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest();

    return `Adapter: (TRANSLATED) ${result.split("").reverse().join("")}`;
  }
}

function clientCode(target: Target) {
  console.log(target.request());
}

const target = new Target();
clientCode(target);

const adaptee = new Adaptee();
console.log("Adaptee: " + adaptee.specificRequest());

const adapter = new Adapter(adaptee);
clientCode(adapter);
