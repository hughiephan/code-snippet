impl UpgradeInfo for DeflateConfig {
    type Info = &'static [u8];
    type InfoIter = iter::Once<Self::Info>;

    fn protocol_info(&self) -> Self::InfoIter {
        iter::once(b"/deflate/1.0.0")
    }
}
