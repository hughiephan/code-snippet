enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    // Basic box usage
    // let b = Box::new(5);
    // println!("{:?}", b);

    // Box indirection with enum
    let list = Cons(1,Box::new(Cons(2, Box::new(Cons(3,Box::new(Nil))))));
}

