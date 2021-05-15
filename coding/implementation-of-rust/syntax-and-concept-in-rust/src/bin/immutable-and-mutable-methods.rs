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

    fn translate(&mut self) {
        self.p1.x = 0;
        self.p1.y = 0;

        self.p2.x = 0;
        self.p2.y = 0;
    }
}

fn main() {
    // This can not call mutable method
    let object = Rectangle {
        p1: Point {x: 1, y: 2},
        p2: Point {x: 3, y: 4},
    };
    // There will be error running the below line
    // object.translate();
    println!("Rectangle area: {}", object.area());

    
    // This can call mutable method
    let mut mutable_object = Rectangle {
        p1: Point {x: 1, y: 2},
        p2: Point {x: 3, y: 4},
    };
    mutable_object.translate();
    println!("Rectangle area: {}", mutable_object.area());
}