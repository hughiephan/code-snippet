// Use Struct ipv4address in function param
// struct IpV4Address(u8, u8, u8, u8);
// fn print_ipv4address(IpV4Address(o1,o2,o3,o4): &IpV4Address) {
//     println!("{}.{}.{}.{}", o1,o2,o3,o4);
// }
//
// fn main() {
//     let addr = IpV4Address(127,0,0,1);
//     print_ipv4address(&addr);
// }

// Manually destruct the ipv4address
struct IpV4Address(u8, u8, u8, u8);
fn print_ipv4address(ipv4address: &IpV4Address) {
    let IpV4Address (o1, o2,o3,o4) = ipv4address;
    println!("{}.{}.{}.{}", o1,o2,o3,o4);
}

fn main() {
    let addr = IpV4Address(127,0,0,1);
    print_ipv4address(&addr);
}
