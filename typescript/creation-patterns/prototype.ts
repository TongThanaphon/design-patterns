class ComponentWithBackReference {
    public dot;

    constructor(dot: Dot) {
        this.dot = dot
    }
}

class Dot {
    public x: number
    public y: number
    public circularReference: ComponentWithBackReference

    public clone(): this {
        const clone = Object.create(this)

        clone.circularReference = {
            ...this.circularReference,
            dot: { ...this }
        }

        return clone
    }
}

function clientCode() {
    const dot1 = new Dot()
    dot1.x = 10
    dot1.y = 20
    dot1.circularReference = new ComponentWithBackReference(dot1)

    const dot2 = dot1.clone()

    console.log(dot1.x === dot2.x) // true 
    console.log(dot1.y === dot2.y) // true
    console.log(dot1.circularReference === dot2.circularReference) // false
    console.log(dot1.circularReference.dot === dot2.circularReference.dot) // true

    console.log(dot1.circularReference)
    console.log(dot2.circularReference)
}

clientCode()