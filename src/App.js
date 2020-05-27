import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const intruments = [
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
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`
      )
      .then((res) => {
        const symbol = res.data["Meta Data"]["2. Symbol"];
        setData(symbol);
        console.log(res.data);
      });
  }, []);

  const handleClick = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="App">
      {intruments.map((instrument, index) => {
        return (
          <button key={index} value={instrument} onClick={handleClick}>
            {instrument}
          </button>
        );
      })}
    </div>
  );
}

export default App;
