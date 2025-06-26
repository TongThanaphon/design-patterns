interface Builder {
    partA(): void
    partB(): void
    partC(): void
}

class Product {
    public parts: string[] = []

    listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}`)
    }
}

class ConcreteBuilder implements Builder {
    private product: Product

    constructor() {
        this.reset()
    }

    reset(): void {
        this.product = new Product()
    }

    partA(): void {
        this.product.parts.push('A')
    }

    partB(): void {
        this.product.parts.push('B')
    }

    partC(): void {
        this.product.parts.push('C')
    }

    build(): Product {
        const result = this.product
        this.reset() // Reset for next build

        return result
    }
}

class Director {
    private builder: Builder

    setBuilder(builder: Builder): void {
        this.builder = builder
    }

    buildMinimalViableProduct(): void {
        this.builder.partA()
    }

    buildFullFeaturedProduct(): void {
        this.builder.partA()
        this.builder.partB()
        this.builder.partC()
    }
}

function clientCode(director: Director) {
    const builder = new ConcreteBuilder()

    director.setBuilder(builder)

    director.buildMinimalViableProduct()
    builder.build().listParts()

    director.buildFullFeaturedProduct()
    builder.build().listParts()
}

const director = new Director()
clientCode(director)