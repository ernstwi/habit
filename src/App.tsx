import { useState, useEffect } from "react";
import { Stack, Grommet, Box, Text, Button } from "grommet";
import { Checkmark } from "grommet-icons";
import useSound from "use-sound";
import clear from "./clear.wav";

const START_DATE = new Date("2024-02-01");

function getMondaysBetween(startDate: Date, endDate: Date) {
  function startOfDay(date: Date) {
    return new Date(date.setHours(0, 0, 0, 0));
  }

  startDate = startOfDay(startDate);
  endDate = startOfDay(endDate);

  // Set to the next Monday if the start date is not a Monday
  const day = startDate.getDay();
  startDate.setDate(startDate.getDate() + ((7 - day + 1) % 7));

  const res: Date[] = [];
  while (startDate <= endDate) {
    res.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 7);
  }

  return res;
}

function formatDate(date: Date) {
  return date.getDate() + "/" + (date.getMonth() + 1);
}

const dates = getMondaysBetween(START_DATE, new Date())
  .reverse()
  .map((date) => date.toDateString());

function App() {
  const [weeks, setWeeks] = useState(
    dates.reduce((acc: Record<string, number>, date) => {
      acc[date] = parseInt(localStorage.getItem(date) ?? "0");
      return acc;
    }, {}),
  );

  useEffect(() => {
    dates.forEach((date) => {
      localStorage.setItem(date, weeks[date].toString());
    });
  }, [weeks]);

  function createSetWeek(week: string) {
    return (value: number) => {
      setWeeks((prev) => ({ ...prev, [week]: value }));
    };
  }

  return (
    <Grommet>
      <Box align="center">
        {Object.entries(weeks).map(([week, value]) => (
          <Week
            key={week}
            week={week}
            value={value}
            setWeek={createSetWeek(week)}
          />
        ))}
        <Button
          margin="large"
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

function color(value: number) {
  const colors: Record<number, string> = {
    1: "linear-gradient(0deg, rgb(240 186 23) 0%, rgb(204 236 20) 100%)",
    2: "linear-gradient(0deg, rgb(64 211 243) 0%, rgb(108 255 234) 100%)",
    3: "linear-gradient(0deg, rgb(43, 235, 16) 0%, rgb(18 255 149) 100%)",
  };
  return colors[Math.max(1, Math.min(value, 3))];
}

function Week({
  week,
  value,
  setWeek,
}: {
  week: string;
  value: number;
  setWeek: (value: number) => void;
}) {
  const [playClear] = useSound(clear);
  return (
    <Stack fill style={{ height: "70px" }}>
      <Box
        style={{
          transition: "width 0.15s ease-in-out",
        }}
        background={color(value)}
        width={(100 / 3) * value + "%"}
        height="70px"
      />
      <Box direction="row" fill justify="start" pad="medium" align="center">
        <Text
          weight="bold"
          style={{ color: "white", textShadow: "0.5px 0.5px 1px black" }}
        >
          {formatDate(new Date(week))}
        </Text>
      </Box>
      <Box direction="row" fill justify="center" align="center">
        <Stack>
          <Box direction="row" width="1em" justify="center">
            <Text
              weight="bold"
              size="large"
              style={{ color: "white", textShadow: "0.5px 0.5px 1px black" }}
            >
              {value}
            </Text>
          </Box>
          {value >= 3 && (
            <Stack>
              <Checkmark
                style={{ marginLeft: "1.55em", marginTop: "0.1em" }}
                color="pink"
              />
              <Checkmark style={{ marginLeft: "1.5em" }} color="white" />
            </Stack>
          )}
        </Stack>
      </Box>
      <Box direction="row" justify="between" fill>
        <Box
          fill
          focusIndicator={false}
          onClick={() => setWeek(Math.max(0, value - 1))}
        />
        <Box
          fill
          focusIndicator={false}
          onClick={() => {
            const newValue = Math.min(value + 1, 9);
            setWeek(newValue);
            if (newValue === 3) playClear();
          }}
        />
      </Box>
    </Stack>
  );
}

export default App;
