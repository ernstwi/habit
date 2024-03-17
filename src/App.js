import { useState, useEffect } from "react";
import { Grommet, grommet, Box, Meter, Text, Button } from "grommet";

import "./App.css";

function App() {
  const [weeks, setWeeks] = useState({
    10: parseInt(localStorage.getItem("2024-10") ?? 3),
    11: parseInt(localStorage.getItem("2024-11") ?? 2),
  });

  useEffect(() => {
    localStorage.setItem("2024-10", weeks[10]);
    localStorage.setItem("2024-11", weeks[11]);
  }, [weeks]);

  function createSetWeek(week) {
    return (value) => {
      setWeeks((prev) => ({ ...prev, [week]: value }));
    };
  }

  return (
    <Grommet theme={grommet} style={{ fontFamily: "monospace" }}>
      <Box fill align="center" justify="center">
        {Object.entries(weeks).map(([week, value]) => (
          <Week
            key={week}
            week={week}
            value={value}
            setWeek={createSetWeek(week)}
          />
        ))}
      </Box>
    </Grommet>
  );
}

function Week({ week, value, setWeek }) {
  return (
    <Box align="center" pad="large" direction="row" gap="small">
      <Text>{week}</Text>
      <Meter
        color={value === 3 ? "status-ok" : "status-warning"}
        type="bar"
        pad="small"
        value={(100 / 3) * value}
      />
      <Text color={value === 3 ? "status-ok" : "default"}>{value}</Text>
      <Button label="-" onClick={() => setWeek(Math.max(0, value - 1))} />
      <Button label="+" onClick={() => setWeek(Math.min(3, value + 1))} />
    </Box>
  );
}

export default App;
