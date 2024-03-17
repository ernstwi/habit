import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [weeks, setWeeks] = useState({
    10: JSON.parse(localStorage.getItem("2024-10")) ?? [false, false, false],
    11: JSON.parse(localStorage.getItem("2024-11")) ?? [false, false, false],
  });

  useEffect(() => {
    localStorage.setItem("2024-10", JSON.stringify(weeks[10]));
    localStorage.setItem("2024-11", JSON.stringify(weeks[11]));
  }, [weeks]);

  function createSetWeek(week) {
    return (values) => {
      setWeeks((prev) => ({ ...prev, [week]: values }));
    };
  }

  return (
    <div className="App">
      {Object.entries(weeks).map(([week, values]) => (
        <Week key={week} values={values} setWeek={createSetWeek(week)} />
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
        <Checkbox
          key={index}
          isChecked={isChecked}
          setBox={createSetBox(index)}
        />
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
