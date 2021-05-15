fn main() {
    {
        let r;

        {
            let x = 5;
            r = &x;

            // x live long enough. r life time here is shorter than x
            println!("r: {}", r);
        }

        // x does not live long enough. x has shorter life time than r
        // println!("r: {}", r);
    }
}