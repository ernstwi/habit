import { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Checkbox />
      </header>
    </div>
  );
}

function Checkbox() {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("isChecked") === "true",
  );

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  // Write state to local storage
  useEffect(() => {
    localStorage.setItem("isChecked", isChecked);
  }, [isChecked]);

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}

export default App;
