class Target {
  request() {
    return "Target: The default behavior.";
  }
}

class Adaptee {
  specificRequest() {
    return ".eetpadA eht fo tcerroc a si sihT";
  }
}

class Adapter extends Target {
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }

  request() {
    const result = this.adaptee.specificRequest();

    return `Adapter: (TRANSLATED) ${result.split("").reverse().join("")}`;
  }
}

function clientCode(target) {
  console.log(target.request());
}

const target = new Target();
clientCode(target);

const adaptee = new Adaptee();
console.log("Adaptee: " + adaptee.specificRequest());

const adapter = new Adapter(adaptee);
clientCode(adapter);
