use std::fs::File;  

fn main() -> std::io::Result<()> {
    let args: Vec<String> = std::env::args().collect();
    let action = &args[1];
    let item = &args[2];

    println!("{}", action);

    File::create("foo.txt")?;

    let line = format!("{} {}\n", action, item);
    std::fs::write("foo.txt", line)?;
     
    Ok(())
}