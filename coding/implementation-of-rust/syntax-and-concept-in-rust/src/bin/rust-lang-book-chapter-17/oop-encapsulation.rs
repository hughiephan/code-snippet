pub struct average_collection {
    list: Vec<i32>,
    average: f64,
}

impl average_collection {
    fn add(&mut self, num: i32) {
        self.list.push(num);
        self.update_average();
    }

    fn update_average(&mut self) {
        let total: i32 = self.list.iter().sum();
        self.average = (total as f64) / (self.list.len() as f64);
    }
}

fn main() {
    let mut collection = average_collection{
        list: [1,2].to_vec(),
        average: 0.0,
    };
    collection.add(4);
    println!("{:?}",collection.list);
    println!("average {:?}", collection.average);
}
