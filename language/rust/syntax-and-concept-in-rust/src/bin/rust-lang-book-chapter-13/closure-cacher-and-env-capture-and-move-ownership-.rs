use std::thread;
use std::time::Duration;

fn generate_workout(intensity: u32, random_number: u32) {
    let expensive_result = |num| {
        println!("calculating slowly");
        thread::sleep(Duration::from_millis(5000));
        num
    };

    if intensity < 25 {
        println!("Today do {} pushups", expensive_result(intensity));
        println!("Next, do {} situps", expensive_result(intensity));
    } else {
        if random_number == 3{
            println!("Take a break");
        } else {
            println!("Today run for {} minutes!", expensive_result(intensity));
        }
    }
}

fn generate_workout_with_cacher(intensity: u32, random_number: u32) {
    let mut expensive_result = Cacher::new(|num| {
        println!("calculating slowly");
        thread::sleep(Duration::from_millis(5000));
        num
    });

    if intensity < 25 {
        println!("Today do {} pushups", expensive_result.value(intensity));
        println!("Next, do {} situps", expensive_result.value(intensity));
    } else {
        if random_number == 3{
            println!("Take a break");
        } else {
            println!("Today run for {} minutes!", expensive_result.value(intensity));
        }
    }
}

////////////
struct Cacher <T>
where
    T: Fn(u32) -> u32,
{
    calculation: T,
    value: Option<u32>,
}

impl <T> Cacher <T>
where
    T: Fn(u32) -> u32,
{
    fn new(calculation: T) -> Cacher<T> {
        Cacher {
            calculation,
            value: None,
        }
    }

    // Refactor to T instead of number
    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            // Refactor to hashmap or this can only handle 1 value only
            // Hashmap should be: key = arg, value = calculated result with that arg
            Some(v) => {
                v
            }
            None => {
                let v = (self.calculation)(arg);
                self.value = Some(v);
                v
            }
        }
    }
}

fn main() {
    // Ways to define closure
    // let add_one_v2 = |x: u32| -> u32 { x + 1 };
    // let add_one_v3 = |x| { x + 1 };
    // let add_one_v4 = |x| x + 1;

    // Closure without generic type error
    // let example_closure = |x| x;
    // let s = example_closure(String::from("abc"));
    // let n = example_closure(32);

    // Without cacher, duplicate expensive code run
    // generate_workout(20,1);

    // Implement cacher
    // generate_workout_with_cacher(20, 1);

    // Capture dynamic environment with closure
    // let x = 4;
    // let equal_to_x_closure = |z| z == x;
    // fn equal_to_x_function(z: i32) -> bool {
    //     z == x
    // }

    // let y = 4;
    // assert!(equal_to_x_closure(y));
    // assert!(equal_to_x_function(y));

    // Move ownership of environment variable into closure
    // let x = vec![1,2,3];
    // let equal_to_x_move_keyword = move |z| z == x;
    // println!("Can't be used here {:?}", x);
    // let y = vec![1,2,3];
    // assert!(equal_to_x_move_keyword(y));
}
