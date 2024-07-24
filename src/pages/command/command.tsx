import { cn } from "@/lib/utils";
import * as React from "react";
import { Search } from "lucide-react";

type DivProps = React.ComponentPropsWithoutRef<"div">;
type InputProps = React.ComponentPropsWithoutRef<"input">;

type State = {
  search: string;
  value: string;
};

type Store = {
  subscribe: (callback: () => void) => () => void;
  snapshot: () => State;
  setState: <K extends keyof State>(key: K, value: State[K]) => void;
  emit: () => void;
};

const StoreContext = React.createContext<Store | undefined>(undefined);

const useStore = () => React.useContext(StoreContext);

function useCmdk<T = any>(selector: (state: State) => T) {
  const command = useStore();
  const cb = () => selector(command!.snapshot());
  return React.useSyncExternalStore(command!.subscribe, cb, cb);
}

function useLazyRef<T>(fn: () => T) {
  const ref = React.useRef<T>();

  if (ref.current === undefined) {
    ref.current = fn();
  }

  return ref as React.MutableRefObject<T>;
}

const Command: React.FC<DivProps> = ({ children, className, ...props }) => {
  const listeners = useLazyRef<Set<() => void>>(() => new Set());
  const state = useLazyRef<State>(() => ({
    search: "",
    value: "",
  }));

  const store: Store = React.useMemo(() => {
    return {
      subscribe: (cb) => {
        listeners.current.add(cb);
        return () => listeners.current.delete(cb);
      },
      snapshot: () => {
        return state.current;
      },
      setState: (key, value) => {
        if (Object.is(state.current[key], value)) return;
        state.current[key] = value;

        // Notify subscribers that state has changed
        store.emit();
      },
      emit: () => {
        listeners.current.forEach((l) => l());
      },
    };
  }, []);

  return (
    <div
      className={cn(
        "flex h-screen w-full flex-col overflow-hidden bg-popover text-popover-foreground",
        className
      )}
      {...props}
    >
      <div
        data-tauri-drag-region
        className="fixed h-8 w-screen top-0 left-0 z-10"
      />
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </div>
  );
};

const CommandSearch: React.FC<InputProps> = ({ className, ...props }) => {
  const store = useStore();
  const search = useCmdk((state) => state.search);

  return (
    <div className="flex items-center px-4">
      <Search className="mr-2 h-6 w-6 shrink-0 opacity-50" />
      <input
        type="text"
        placeholder="欢迎使用 Kit"
        className={cn(
          "flex h-16 w-full rounded-md bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={search}
        onChange={(e) => {
          store?.setState("search", e.target.value);
        }}
        {...props}
      />
    </div>
  );
};

const CommandResult: React.FC<DivProps> = () => {
  const search = useCmdk((state) => state.search);
  return (
    <>
      {search.length > 0 ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden"></div>
      ) : (
        <div></div>
      )}
    </>
  );
};

const CommandFooter: React.FC<DivProps> = () => {
  return <div className="w-full h-10 p-2 flex items-center"></div>;
};

export { Command, CommandSearch, CommandResult, CommandFooter };
