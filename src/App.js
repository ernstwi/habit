import { useState, useEffect } from "react";
import { Grommet, grommet, Box, Meter, Text, Button } from "grommet";

import "./App.css";

const START_DATE = new Date("2024-03-01");

function getMondaysBetween(startDate, endDate) {
  function startOfDay(date) {
    return new Date(date.setHours(0, 0, 0, 0));
  }

  startDate = startOfDay(startDate);
  endDate = startOfDay(endDate);

  // Set to the next Monday if the start date is not a Monday
  const day = startDate.getDay();
  startDate.setDate(startDate.getDate() + ((7 - day + 1) % 7));

  const res = [];
  while (startDate <= endDate) {
    res.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 7);
  }

  return res;
}

const dates = getMondaysBetween(START_DATE, new Date()).map((date) =>
  date.toDateString(),
);

function App() {
  const [weeks, setWeeks] = useState(
    dates.reduce((acc, date) => {
      acc[date] = parseInt(localStorage.getItem(date) ?? 0);
      return acc;
    }, {}),
  );

  useEffect(() => {
    dates.forEach((date) => {
      localStorage.setItem(date, weeks[date]);
    });
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
        <Button
          label="Reset"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        />
      </Box>
    </Grommet>
  );
}

function Week({ week, value, setWeek }) {
  return (
    <Box align="center" pad="large" direction="row" gap="small">
      <Text>{week}</Text>
      <Meter
        color={`accent-${4 - value}`}
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
