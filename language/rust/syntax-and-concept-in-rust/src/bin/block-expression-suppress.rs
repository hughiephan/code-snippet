fn main() {
    let x = 5;

    let y = {
        // Expression is assigned to y
        2 * x
    };

    let z = {
        // Expression is suppressed by ";"
        2 * x ;
    };

    println!("{}", x);
    println!("{}", y);
    println!("{:?}", z);
}