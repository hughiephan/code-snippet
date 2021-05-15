fn main() {
    let mut stack = Vec::new();

    stack.push(1);
    stack.push(2);

    // Because stack.pop returns Some(...)
    // We can use expression Some(number) = Some(...) to get the number value
    while let Some(number) = stack.pop() {
        println!("{:?}", number);
    }
}
