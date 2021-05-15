use std::collections::HashMap; 

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let item = &args[2];

    let mut object = TODO {
        map: HashMap::new()
    };

    object.insert(item.to_string());
    object.insert("another".to_string());
    object.show();
}

struct TODO {
    map: HashMap<String, bool>
}

impl TODO {
    fn insert(&mut self, item: String) {
        self.map.insert(item, true);
    }

    fn show(self) {
        for (key, value) in self.map {
            println!("{} {}", key, value);
        }
    }
}
//  cargo run -- add world! 
// Should print: world! true and another true