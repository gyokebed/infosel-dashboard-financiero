import React from "react";

const RealTimeQuote = ({ data, price, lastRefreshed, currentInstrument }) => {
  return (
    <React.Fragment>
      <h1>Quote</h1>
      <div>{data ? currentInstrument : ""}</div>
      <div>Price: {data ? price : ""}</div>
      <div>Last Refreshed: {data ? lastRefreshed : ""}</div>
    </React.Fragment>
  );
};

export default RealTimeQuote;
