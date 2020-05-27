import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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
  return <div className="App">Symbol: {data}</div>;
}

export default App;
