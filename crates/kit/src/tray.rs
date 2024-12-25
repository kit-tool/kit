use tauri::{
    menu::{MenuBuilder, MenuItem, PredefinedMenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, Runtime,
};
use tauri_plugin_opener::OpenerExt;

/// 创建系统托盘图标和系统托盘菜单
///
/// ## 具体菜单列表
/// * 帮助文档
/// * 开发文档
/// * 问题反馈
/// * 关于 Kit
/// * 系统设置
/// * 退出 Kit
#[allow(dead_code)]
pub fn create_tray<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    let help = MenuItem::with_id(app, "help", "帮助文档", true, None::<&str>)?;
    let dev = MenuItem::with_id(app, "dev", "开发文档", true, None::<&str>)?;
    let issues = MenuItem::with_id(app, "issues", "问题反馈", true, None::<&str>)?;
    let about = MenuItem::with_id(app, "about", "关于 Kit", true, None::<&str>)?;
    let setting = MenuItem::with_id(app, "setting", "系统设置", true, None::<&str>)?;
    let quit = PredefinedMenuItem::quit(app, Some("退出 Kit"))?;

    let menu = MenuBuilder::new(app)
        .items(&[&help, &dev, &issues])
        .separator()
        .items(&[&about, &setting])
        .separator()
        .item(&quit)
        .build()?;

    let _ = TrayIconBuilder::with_id("search")
        .tooltip("Kit")
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .on_menu_event(move |app, event| match event.id.as_ref() {
            "help" => {}
            "dev" => {}
            "issues" => {
                let _ = app
                    .opener()
                    .open_url("https://github.com/kit-tool/kit/issues", None::<&str>);
            }
            "about" => {
                let _ = app
                    .opener()
                    .open_url("https://github.com/kit-tool/kit", None::<&str>);
            }
            "setting" => {}
            _ => {}
        })
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
