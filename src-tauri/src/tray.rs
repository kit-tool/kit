use tauri::{tray::TrayIconBuilder, Runtime};

pub fn create_tray<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {

  let _ = TrayIconBuilder::with_id("seach")
    .tooltip("Kit")
    .icon(app.default_window_icon().unwrap().clone())
    .build(app);
  Ok(())
}