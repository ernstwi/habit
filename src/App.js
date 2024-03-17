import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [weeks, setWeeks] = useState({
    10: [true, true, true],
    11: [true, true, false],
  });

  return (
    <div className="App">
      {Object.entries(weeks).map(([week, value]) => (
        <Week week={week} val={value} />
      ))}
    </div>
  );
}

function Week({ week, val }) {
  return (
    <div className="week">
      {val.map((isChecked) => (
        <Checkbox isChecked={isChecked} />
      ))}
    </div>
  );
}

function Checkbox({ isChecked }) {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      // onChange={handleCheckboxChange}
    />
  );
}

export default App;
