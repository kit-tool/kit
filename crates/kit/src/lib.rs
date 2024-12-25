use tauri::{Manager, PhysicalPosition};

mod tray;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(move |app| {
            let handle = app.handle();
            tray::create_tray(handle)?;
            // 调整窗口位置
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
