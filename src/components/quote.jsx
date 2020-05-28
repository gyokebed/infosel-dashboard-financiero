import React from "react";

const Quote = ({ data, lastRefreshed }) => {
  console.log(data);
  return (
    <React.Fragment>
      <h1>Quote (Day)</h1>
      <div>Open price: {data.o}</div>
      <div>High price: {data.h}</div>
      <div>Low price: {data.l}</div>
      <div>Previous close price: {data.pc}</div>
      <div>Last refreshed: {lastRefreshed}</div>
    </React.Fragment>
  );
};

export default Quote;
