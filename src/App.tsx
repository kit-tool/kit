import "./App.css";

import {
  Command,
  CommandInput,
  CommandList,
  CommandFooter,
  CommandButton,
} from "@/components/ui/command";
import { useCallback, useState } from "react";
import { Logo } from "@/components/icon";
import { getCurrent, LogicalSize } from "@tauri-apps/api/window";
import { debounce } from "lodash";

function App() {
  const [search, setSearch] = useState("");

  function onValueChange(v: string) {
    setSearch(v);
    setWindowSize(v);
  }

  const setWindowSize = useCallback(
    debounce(async (value: string) => {
      const webview = getCurrent();
      const webviewSize = await webview.innerSize();
      const scale = await webview.scaleFactor();
      console.log(webviewSize.height / scale, value.length, value);
      if (value.length > 0 && webviewSize.height / scale < 500) {
        webview.setSize(
          new LogicalSize(
            webviewSize.width / scale,
            webviewSize.height / scale + 400
          )
        );
      } else if (value.length === 0 && webviewSize.height / scale > 500) {
        console.log('----')
        webview.setSize(
          new LogicalSize(
            webviewSize.width / scale,
            webviewSize.height / scale - 400
          )
        );
      }
    }, 200),
    [search]
  );

  return (
    <div className="h-screen">
      <div
        data-tauri-drag-region
        className="fixed h-3 w-screen top-0 left-0 z-10"
      ></div>
      <Command className="border">
        <CommandInput
          value={search}
          onValueChange={onValueChange}
          autoFocus
          placeholder="你好，欢迎使用 Kit"
        />
        <CommandList></CommandList>
        <CommandFooter>
          <CommandButton>
            <Logo
              className="w-4 h-4 p-1 rounded-full bg-primary mr-1"
              color="#fff"
            />
            设置
          </CommandButton>
          <CommandButton>
            <Logo
              className="w-4 h-4 p-1 rounded-full bg-primary"
              color="#fff"
            />
          </CommandButton>
        </CommandFooter>
      </Command>
    </div>
  );
}

export default App;
