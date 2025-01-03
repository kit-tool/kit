use core::tray;

use tauri::{
    window::{Effect, EffectsBuilder, WindowBuilder},
    LogicalPosition, PhysicalPosition, PhysicalSize, WebviewBuilder, WebviewUrl, WindowEvent,
};

mod cmd;
mod core;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_positioner::init())
        .setup(move |app| {
            let width = 800.;
            let height = 90.;

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

            // 创建系统托盘
            let handle = app.handle();
            tray::create_tray(handle)?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![cmd::window::set_window_size])
        // 统一处理事件
        .on_window_event(|window, event| match event {
            WindowEvent::Resized(size) => {
                println!("{} 窗口触发了窗口缩放事件: {:#?}", window.label(), size);
            }
            WindowEvent::Focused(focused) => {
                println!("{} 窗口触发了窗口缩放事件: {:#?}", window.label(), focused);
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
