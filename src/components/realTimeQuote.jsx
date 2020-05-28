import React from "react";

const RealTimeQuote = ({
  realTimeData,
  price,
  volume,
  lastRefreshed,
  currentInstrument,
}) => {
  return (
    <React.Fragment>
      <h1>Quote</h1>
      <div>{realTimeData ? currentInstrument : ""}</div>
      <div>Price: {realTimeData ? price : ""}</div>
      <div>Last Refreshed: {realTimeData ? lastRefreshed : ""}</div>
      {volume ? <div>Volume: {volume}</div> : ""}
    </React.Fragment>
  );
};

export default RealTimeQuote;
