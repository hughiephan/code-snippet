use crossbeam; // 0.7.3
use std::sync::Mutex;

fn main() {
    let data = Mutex::new(vec![0, 1]);

    crossbeam::scope(|scope| {
        // these run concurrently:
        let _guard = scope.spawn(|_| {
            data.lock().unwrap().push(2);
        });
        data.lock().unwrap().push(3);
    })
    .unwrap();

    println!("{:?}", data.lock().unwrap());
    // one of [0, 1, 2, 3] or [0, 1, 3, 2]
}
