# Reference 
# https://docs.rs/libp2p-core/0.3.2/src/libp2p_core/upgrade/mod.rs.html#94-102
# https://github.com/libp2p/rust-libp2p/blob/master/transports/deflate/src/lib.rs

pub trait UpgradeInfo {
    /// Opaque type representing a negotiable protocol.
    type Info: ProtocolName + Clone;
    /// Iterator returned by `protocol_info`.
    type InfoIter: IntoIterator<Item = Self::Info>;

    /// Returns the list of protocols that are supported. Used during the negotiation process.
    fn protocol_info(&self) -> Self::InfoIter;
}

impl UpgradeInfo for DeflateConfig {
    type Info = &'static [u8];
    type InfoIter = iter::Once<Self::Info>;

    fn protocol_info(&self) -> Self::InfoIter {
        iter::once(b"/deflate/1.0.0")
    }
}
