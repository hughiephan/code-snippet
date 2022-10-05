mod front_of_the_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }

    mod serving {
        fn take_order() {}
    }
}

pub fn eat_at_restaurant () {
    crate::front_of_the_house::hosting::add_to_waitlist();

    front_of_the_house::hosting::add_to_waitlist();
}

///////////////////////

fn serve_order () { }

mod back_of_house {
    fn fix_correct_order () {
        cook_order();

        // Same result for super and crate, because the ancestor is crate
        crate::serve_order();
        super::serve_order();
    }

    fn cook_order () {
    }
}

///////////////////////

mod back_of_house_test_struct_call {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}

pub fn eat_at_restaurant_test_struct_call() {
    let mut meal = back_of_house_test_struct_call::Breakfast::summer("A Rye toast");

    meal.toast = String::from("Wheat");

    println!("{}", meal.toast);
}

//////////////////////////

mod back_of_house_test_enum {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant_test_enum() {
    let order1 = back_of_house_test_enum::Appetizer::Soup;
    let order2 = back_of_house_test_enum::Appetizer::Salad;
}