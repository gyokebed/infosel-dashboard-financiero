import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import "./App.css";

const apiKey = "A1TYJ6O8KY63WSSK";

const intruments = [
  "IBM",
  "AAPL",
  "AA",
  "AAL",
  "AAMC",
  "ABEO",
  "ABR",
  "ABT",
  "AC",
  "ACB",
  "ACEL",
];

function App() {
  const instrument = intruments[0];
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${instrument}&interval=5min&apikey=demo`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const handleClick = (e) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${e.target.value}&interval=5min&apikey=${apiKey}`
      )
      .then((res) => {
        setData(res.data);
      });
  };

  console.log(data);

  return (
    <Box className="App">
      {intruments.map((instrument, index) => {
        return (
          <Button
            variant="contained"
            color="primary"
            key={index}
            value={instrument}
            onClick={handleClick}
          >
            {instrument}
          </Button>
        );
      })}

      <div>Symbol: {data && data["Meta Data"]["2. Symbol"]}</div>
    </Box>
  );
}

export default App;
