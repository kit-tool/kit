use tauri::{Manager, PhysicalPosition};

mod tray;

pub fn run_app() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(move |app| {
            let handle = app.handle();
            tray::create_tray(handle)?;
            // 设置窗口隐藏
            // if let Some(window) = app.get_webview_window("search") {
            //     let window_ = window.clone();
            //     window.on_window_event(move |event| {
            //         if let WindowEvent::Focused(false) = event {
            //             let _ = window_.hide();
            //         }
            //     })
            // }

            // 调整窗口初始化位置
            if let Some(window) = app.get_webview_window("search") {
                if let Some(monitor) = window.current_monitor()? {
                    let monitor_size = monitor.size();
                    let window_size = window.inner_size()?;
                    let position = PhysicalPosition::new(
                        (monitor_size.width - window_size.width) / 2,
                        (monitor_size.height - window_size.height - 400) / 2,
                    );
                    window.set_position(position)?;
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
