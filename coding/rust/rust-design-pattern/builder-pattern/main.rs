pub struct Foo {
    bar: String,
}

impl Foo {
    pub fn builder() -> FooBuilder {
        FooBuilder::default()
    }
}

#[derive(Default)]
pub struct FooBuilder {
    bar: String,
}

// If we don't use Default derive, we can impl it ourself
// impl Default for FooBuilder {
//     fn default() -> FooBuilder {
//         FooBuilder {
//             bar: "".to_string(),
//         }
//     }
// }

impl FooBuilder {
    pub fn name(mut self, bar: String) -> FooBuilder {
        self.bar = bar;
        self
    }

    pub fn build(self) -> Foo {
        Foo { bar: self.bar }
    }
}


fn main() {
    let normal_foo = Foo {
        bar: String::from("abc"),
    };

    let foo_from_builder: Foo = FooBuilder::default().name(String::from("def")).build();
    println!("{}",normal_foo.bar);
    println!("{}",foo_from_builder.bar);
}
