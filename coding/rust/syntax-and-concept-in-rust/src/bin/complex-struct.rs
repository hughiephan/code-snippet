struct Point {
    x: i32,
    y: i32,
}

struct Rectangle {
    p1: Point,
    p2: Point,
}

impl Rectangle {
    fn area(&self) -> i32 {
        println!("{:?}", self.p1.x);
        println!("{:?}", self.p1.y);

        println!("{}", self.p2.x);
        println!("{}", self.p2.y);

        ((self.p1.x - self.p2.x) * (self.p1.y - self.p2.y)).abs()
    }
}

fn main() {
    let object = Rectangle {
        p1: Point {x: 1, y: 2},
        p2: Point {x: 3, y: 4},
    };
    println!("Rectangle area: {}", object.area());
}