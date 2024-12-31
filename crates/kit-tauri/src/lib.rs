use core::tray;

use tauri::{
    window::{Effect, EffectsBuilder, WindowBuilder},
    LogicalPosition, PhysicalPosition, PhysicalSize, WebviewBuilder, WebviewUrl, WindowEvent,
};

mod core;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_positioner::init())
        .setup(move |app| {
            let width = 750.;
            let height = 55.;

            let effects = EffectsBuilder::new()
                .effects(vec![Effect::Acrylic, Effect::Blur])
                .build();

            let window = WindowBuilder::new(app, "main")
                .inner_size(width, height)
                .resizable(false)
                .decorations(false)
                .transparent(true)
                .effects(effects)
                .min_inner_size(width, height)
                .center()
                .visible(false)
                .skip_taskbar(true)
                // .always_on_top(true)
                .build()?;

            // 窗口物理像素
            let window_size = window.inner_size()?;

            // 窗口定位
            if let Some(monitor) = app.primary_monitor()? {
                let monitor_size = monitor.size();
                window.set_position(PhysicalPosition::new(
                    (monitor_size.width - window_size.width) / 2,
                    (monitor_size.height - window_size.height - 400) / 2,
                ))?;
            }

            window.add_child(
                WebviewBuilder::new("search", WebviewUrl::default()).transparent(true),
                LogicalPosition::new(0., 0.),
                PhysicalSize::new(window_size.width - 1, window_size.height - 1),
            )?;

            window.clone().on_window_event(move |event| match event {
                WindowEvent::Resized(size) => {
                    let webviews = window.webviews();
                    webviews
                        .iter()
                        .for_each(|webview| println!("窗口label: {}", webview.label()));
                }
                // tauri bug 等待新版本修复
                // WindowEvent::Focused(false) => {
                //     window.hide().ok();
                // }
                _ => {}
            });

            // 创建系统托盘
            let handle = app.handle();
            tray::create_tray(handle)?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
