fn longest_with_borrow(x: String, y: String) -> String {
    if (x.len() > y.len()) {
        x
    }
    else {
        y
    }
}

fn longest_with_return_is_string(x: &String, y: &String) -> String {
    if (x.len() > y.len()){
        x.to_string()
    } else {
        y.to_string()
    }
}

// This won't prompt error with life time
fn random_func(x: &String) -> &String {
    x
}

// This will prompt error with life time
// fn longest_with_return_is_reference(x: &String) -> &String {
//     if (x.len() > y.len()){
//         x
//     } else {
//         y
//     }
// }

// Two arguments with reference and a reference return need to be written with a lifetime
fn longest_with_return_is_reference<'a>(x: &'a String, y: &'a String) -> &'a String {
    if (x.len() > y.len()){
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    // the value of string1 is borrowed by longest function, that's why we need to use reference. This will prompt error
    // println!("{}", longest_with_borrow(string1, string2.to_string()));
    // println!("{}", string1); 

    // This would be ok because we use reference and the value is not lost
    // println!("{}", longest_with_return_is_string(&string1, &string2.to_string()));
    // println!("{}", string1); 

    println!("{}", longest_with_return_is_reference(&string1, &string2.to_string()));
    // println!("{}", string1);
}