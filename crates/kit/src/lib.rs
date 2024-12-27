use tauri::{
    window::{Effect, EffectsBuilder},
    WebviewUrl, WebviewWindowBuilder,
};

mod tray;

pub fn run() {
    tauri::Builder::default()
        .setup(move |app| {
            let win_width = 800.;
            let win_height = 70.;

            let effects = EffectsBuilder::new()
                .effects(vec![Effect::Acrylic, Effect::Blur])
                .build();

            let mut window_builder =
                WebviewWindowBuilder::new(app, "search", WebviewUrl::default());

            window_builder = window_builder
                // 设置窗口大小
                .inner_size(win_width, win_height)
                // 设置窗口不可缩放
                .resizable(false)
                // 设置窗口无标题栏
                .decorations(false)
                .theme(Some(tauri::Theme::Dark))
                // 设置窗口在任务栏隐藏图标
                .skip_taskbar(true)
                // 设置窗口透明背景
                .transparent(true)
                // 设置窗口磨砂背景
                .effects(effects)
                // 设置窗口初始不可见
                .visible(false);

            if let Some(monitor) = app.primary_monitor()? {
                let monitor_size = monitor.size();
                let monitor_scale = monitor.scale_factor();
                window_builder = window_builder.position(
                    (monitor_size.width as f64 - win_width * monitor_scale) / 2.,
                    (monitor_size.height as f64 - win_height * monitor_scale - 400.) / 2.,
                );
            }

            let _ = window_builder.build()?;

            // 创建系统托盘
            let handle = app.handle();
            tray::create_tray(handle)?;

            // 失去焦点隐藏
            // let webview_ = webview.clone();
            // webview.on_window_event(move |event| {
            //     if let WindowEvent::Focused(false) = event {
            //         let _ = webview_.hide();
            //     }
            // });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
