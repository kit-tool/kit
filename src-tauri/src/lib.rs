// use tauri::{Manager, WindowEvent};


mod tray;

pub fn run_app() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(move |app| {
            let handle = app.handle();
            tray::create_tray(handle)?;
            // if let Some(window) = app.get_webview_window("search") {
            //     let window_ = window.clone();
            //     window.on_window_event(move |event| {
            //         if let WindowEvent::Focused(false) = event {
            //             let _ = window_.hide();
            //         }
            //     })
            // }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}