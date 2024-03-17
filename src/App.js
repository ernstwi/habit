import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [weeks, setWeeks] = useState({
    10: [true, true, true],
    11: [true, true, false],
  });

  function createSetWeek(week) {
    return (values) => {
      setWeeks((prev) => ({ ...prev, [week]: values }));
    };
  }

  return (
    <div className="App">
      {Object.entries(weeks).map(([week, values]) => (
        <Week values={values} setWeek={createSetWeek(week)} />
      ))}
    </div>
  );
}

function Week({ values, setWeek }) {
  function createSetBox(index) {
    return (value) => {
      const newValues = [...values];
      newValues[index] = value;
      setWeek(newValues);
    };
  }

  return (
    <div className="week">
      {values.map((isChecked, index) => (
        <Checkbox isChecked={isChecked} setBox={createSetBox(index)} />
      ))}
    </div>
  );
}

function Checkbox({ isChecked, setBox }) {
  function handleCheckboxChange() {
    setBox(!isChecked);
  }

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
}

export default App;
