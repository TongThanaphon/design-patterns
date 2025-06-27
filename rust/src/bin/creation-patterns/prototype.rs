#[derive(Clone)]
struct Dot {
    x: f32,
    y: f32,
}

fn main() {
    let dot1 = Dot { x: 1.0, y: 2.0 };
    let dot2 = dot1.clone(); // Cloning the dot to create a prototype

    println!("Dot 1: ({}, {})", dot1.x, dot1.y);
    println!("Dot 2: ({}, {})", dot2.x, dot2.y);
}
