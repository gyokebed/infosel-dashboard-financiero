import React from "react";

const RealTimeQuote = ({
  realTimeData,
  price,
  volume,
  realTimeLastRefreshed,
  currentInstrument,
}) => {
  return (
    <React.Fragment>
      <h1>Quote</h1>
      <div>Symbol: {realTimeData ? currentInstrument : ""}</div>
      <div>Price: {realTimeData ? price : ""}</div>
      <div>Last Refreshed: {realTimeData ? realTimeLastRefreshed : ""}</div>
      {volume ? <div>Volume: {volume}</div> : ""}
    </React.Fragment>
  );
};

export default RealTimeQuote;
