use tauri::{
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, Runtime,
};

/// 创建系统托盘图标和系统托盘菜单
///
/// ## 具体菜单列表
/// * 帮助文档
/// * 开发文档
/// * 问题反馈
/// * 关于 Kit
/// * 系统设置
/// * 退出 Kit
pub fn create_tray<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    let _ = TrayIconBuilder::with_id("search")
        .tooltip("Kit")
        .icon(app.default_window_icon().unwrap().clone())
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } = event
            {
                let app = tray.app_handle();
                if let Some(window) = app.get_webview_window("search") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
            }
        })
        .build(app);
    Ok(())
}
