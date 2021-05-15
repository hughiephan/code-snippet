#[derive(Debug)]
struct TupleTwo(i32,i32);

fn main() {
    let v = vec!['a','b','c'];

    let t = TupleTwo(0,0);

    // Not very useful tuple struct
    for t in v.iter().enumerate() {
        println!("{:?} ", t);
    }

    // Expression with for loop
    for (number, character) in v.iter().enumerate() {
        println!("{} {}", number,character);
    }
}
