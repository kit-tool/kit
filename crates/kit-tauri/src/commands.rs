use tauri::{Manager, PhysicalSize};

#[tauri::command]
pub fn set_window_size(app_handle: tauri::AppHandle) {
    if let Some(window) = app_handle.get_window("main") {
        if let Ok(scale) = window.scale_factor() {
            if let Ok(window_size) = window.inner_size() {
                let new_height = window_size.height + (400. * scale) as u32;
                let new_window_size = PhysicalSize::new(window_size.width, new_height);
                // TODO 待新版本修复bug
                window.set_size(new_window_size).ok();
            }
        }
    }
}
