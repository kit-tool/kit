import "./App.css";

import { Command, CommandSearch, CommandResult, CommandFooter } from './pages/command/command';

function App() {

  return (
    <Command>
      <CommandSearch />
      <CommandResult />
      <CommandFooter />
    </Command>
  );
}

export default App;
