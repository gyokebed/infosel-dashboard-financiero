import React from "react";
import RealTimeQuote from "./realTimeQuote";
import Quote from "./quote";

const InstrumentInfo = ({ realTimeData, data, currentInstrument }) => {
  const price = realTimeData.type === "trade" ? realTimeData.data[0].p : data.c;
  const volume = realTimeData.type === "trade" ? realTimeData.data[0].v : "";
  let realTimeLastRefreshed =
    realTimeData.type === "trade" ? realTimeData.data[0].t : data.t * 1000;

  let lastRefreshed = convert(data.t * 1000);

  function convert(unixTimestamp) {
    const dateObject = new Date(unixTimestamp);
    const humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
  }

  realTimeLastRefreshed = convert(realTimeLastRefreshed);

  return (
    <React.Fragment>
      <RealTimeQuote
        realTimeData={realTimeData}
        data={data}
        price={price}
        realTimeLastRefreshed={realTimeLastRefreshed}
        currentInstrument={currentInstrument}
        volume={volume}
      />
      <Quote data={data} lastRefreshed={lastRefreshed} />
    </React.Fragment>
  );
};

export default InstrumentInfo;
