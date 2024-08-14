pub trait Plugin: Send {
    /// 插件名称
    fn name(&self) -> &'static str;

    /// 插件初始化，应用启动回调
    #[allow(unused_variables)]
    fn initialize(&self) {}

    /// 打开插件窗口时回调
    #[allow(unused_variables)]
    fn window_open(&self) {}

    /// 输入框搜索时回调
    #[allow(unused_variables)]
    fn on_search(&self) {}
}
