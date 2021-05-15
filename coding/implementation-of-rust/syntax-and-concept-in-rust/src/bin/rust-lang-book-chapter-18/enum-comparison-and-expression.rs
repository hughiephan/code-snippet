#[derive(PartialEq)]
enum Foo {
    Bar,
    Baz,
}

fn main() {
    // Check exhaustive with _
    // let number = 13;
    // match number {
    //     1 => {
    //         println!("hey")
    //     },
    //     _ => println!("other case"),
    // }

    // Enum comparison
    let a = Foo::Bar;
    let b = Foo::Baz;

    if let Foo::Bar = a {
        println!("a is foobar");
    }

    // Needs partial eq derivable
    if Foo::Bar == a {
        println!("a is foobar");
    }
}
