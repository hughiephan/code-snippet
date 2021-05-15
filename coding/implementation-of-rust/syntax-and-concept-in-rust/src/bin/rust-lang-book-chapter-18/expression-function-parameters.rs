fn print_cordinates((x, y): (i32,i32)) {
    println!("{} {}", x, y);
}

fn main() {
    let point = (3,5);
    print_cordinates(point);
}
