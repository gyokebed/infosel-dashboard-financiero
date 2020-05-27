import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import InstrumentsTable from "./components/instrumentsTable";
import { instruments } from "./utils/instruments";
import "./App.css";

const apiKey = "A1TYJ6O8KY63WSSK";

function App() {
  const instrument = instruments[0].symbol;
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${instrument}&interval=5min&apikey=demo`
      )
      .then((res) => {
        setData(res.data);
      });
  }, [instrument]);

  const handleClick = (instrument) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${instrument}&interval=5min&apikey=${apiKey}`
      )
      .then((res) => {
        setData(res.data);
      });
  };

  console.log(data);

  return (
    <Box className="App">
      {instruments.map((instrument, index) => {
        return (
          <Button
            variant="contained"
            color="primary"
            key={index}
            onClick={() => {
              handleClick(instrument.symbol);
            }}
          >
            {instrument.symbol}
          </Button>
        );
      })}

      <div>Symbol: {data && data["Meta Data"]["2. Symbol"]}</div>

      <InstrumentsTable />
    </Box>
  );
}

export default App;
