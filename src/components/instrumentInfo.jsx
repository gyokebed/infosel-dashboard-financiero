import React from "react";
import RealTimeQuote from "./realTimeQuote";

const InstrumentInfo = ({ realTimeData, data, currentInstrument }) => {
  console.log("RT:", realTimeData, "data:", data);
  const price = realTimeData.type === "trade" ? realTimeData.data[0].p : data.c;
  let lastRefreshed =
    realTimeData.type === "trade" ? realTimeData.data[0].t : data.t * 1000;

  function convert(unixTimestamp) {
    const dateObject = new Date(unixTimestamp);
    const humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
  }

  lastRefreshed = convert(lastRefreshed);

  return (
    <React.Fragment>
      <RealTimeQuote
        data={realTimeData}
        price={price}
        lastRefreshed={lastRefreshed}
        currentInstrument={currentInstrument}
      />
    </React.Fragment>
  );
};

export default InstrumentInfo;
