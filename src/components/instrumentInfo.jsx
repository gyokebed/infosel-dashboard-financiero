import React from "react";

const InstrumentInfo = ({ data, currentInstrument }) => {
  const price = data.type === "trade" ? data.data[0].p : data.c;
  const lastRefreshed = data.type === "trade" ? data.data[0].t : data.t;

  console.log(price);

  return (
    <React.Fragment>
      <div>{data ? currentInstrument : ""}</div>
      <div>Price: {data ? price : ""}</div>
      <div>Last refreshed: {data ? lastRefreshed : ""}</div>
    </React.Fragment>
  );
};

export default InstrumentInfo;
