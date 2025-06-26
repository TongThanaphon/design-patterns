interface Transport {
    deliver(): string
}

abstract class LogisticsFactory {
    public abstract createTransport(): Transport; 

    public operation(): string {
        const transport = this.createTransport();

        return transport.deliver();
    }
}

class Truck extends LogisticsFactory implements Transport {
    public createTransport(): Transport {
        return new Truck()
    }

    public deliver(): string {
        return "Delivering by land";
    }
}

class Train extends LogisticsFactory implements Transport {
    public createTransport(): Transport {
        return new Train()
    }

    public deliver(): string {
        return "Delivering by rail";
    }
}

class Ship extends LogisticsFactory implements Transport {
    public createTransport(): Transport {
        return new Ship()
    }

    public deliver(): string {
        return "Delivering by sea";
    }

    public operation(): string {
        return "I will manage to deliver by sea";
    }
}

function clientCode(factory: LogisticsFactory) {
    console.log(factory.operation())
}

clientCode(new Truck()); // Delivering by land
clientCode(new Ship()); // Delivering by sea
clientCode(new Train()); // Delivering by rail