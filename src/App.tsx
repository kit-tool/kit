import "./App.css";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import { getCurrent, LogicalSize } from '@tauri-apps/api/window';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState('');

  function onValueChange(v: string) {
    setWindowSize();
    setSearch(v);
  }

  async function setWindowSize() {
    let windowSize: LogicalSize;
    if(search) {
      windowSize = new LogicalSize(800, 400);
    }else {
      windowSize = new LogicalSize(800, 96);
    }
    await getCurrent().setSize(windowSize);
  }

  return (
    <div className="h-screen">
      <div data-tauri-drag-region className="fixed h-3 w-screen top-0 left-0 z-10"></div>
      <Command className="border">
        <CommandInput value={search} onValueChange={onValueChange} autoFocus placeholder="你好，欢迎使用 Kit" />
        <CommandList>
          {/* <CommandEmpty>没有匹配的搜索项</CommandEmpty> */}
          {/* <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </Command>
    </div>
  );
}

export default App;
