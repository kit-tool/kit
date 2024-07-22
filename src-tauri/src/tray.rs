use tauri::{tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent}, Manager, Runtime};

pub fn create_tray<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {

  let _ = TrayIconBuilder::with_id("search")
    .tooltip("Kit")
    .icon(app.default_window_icon().unwrap().clone())
    .on_tray_icon_event(|tray, event|{
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