import React from "react";

const InstrumentInfo = ({ data, currentInstrument }) => {
  const price = data.type === "trade" ? data.data[0].p : data.c;
  let lastRefreshed = data.type === "trade" ? data.data[0].t : data.t * 1000;

  function convert(unixTimestamp) {
    const dateObject = new Date(unixTimestamp);
    const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
    return humanDateFormat;
  }

  lastRefreshed = convert(lastRefreshed);

  return (
    <React.Fragment>
      <div>{data ? currentInstrument : ""}</div>
      <div>Price: {data ? price : ""}</div>
      <div>Last trade: {data ? lastRefreshed : ""}</div>
    </React.Fragment>
  );
};

export default InstrumentInfo;
