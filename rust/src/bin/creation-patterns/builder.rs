trait Bulder {
    fn part_a(&mut self);
    fn part_b(&mut self);
    fn part_c(&mut self);
}

#[derive(Clone)]
struct Product {
    parts: Vec<String>,
}

impl Product {
    fn list_parts(&self) {
        println!("Product parts: {:?}", self.parts.join(", "));
    }
}

struct ConcreteBuilder {
    product: Product,
}

impl ConcreteBuilder {
    fn new() -> Self {
        Self {
            product: Product { parts: Vec::new() },
        }
    }

    fn reset(&mut self) {
        self.product = Product { parts: Vec::new() };
    }

    fn build(&mut self) -> Product {
        let result = self.product.clone();

        self.reset();

        result
    }
}

impl Bulder for ConcreteBuilder {
    fn part_a(&mut self) {
        self.product.parts.push("A".to_string());
    }

    fn part_b(&mut self) {
        self.product.parts.push("B".to_string());
    }

    fn part_c(&mut self) {
        self.product.parts.push("C".to_string());
    }
}

struct Director;

impl Director {
    fn build_minimal_viable_product(builder: &mut impl Bulder) {
        builder.part_a();
    }

    fn build_full_featured_product(builder: &mut impl Bulder) {
        builder.part_a();
        builder.part_b();
        builder.part_c();
    }
}

fn main() {
    let mut builder = ConcreteBuilder::new();

    Director::build_minimal_viable_product(&mut builder);
    builder.build().list_parts();

    Director::build_full_featured_product(&mut builder);
    builder.build().list_parts();
}
