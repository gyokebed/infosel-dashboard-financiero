import React from "react";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "../Dashboard";
import RealTimeQuote from "./realTimeQuote";
import Quote from "./quote";

const InstrumentQuote = ({ realTimeData, data, currentInstrument }) => {
  const price = realTimeData.type === "trade" ? realTimeData.data[0].p : data.c;
  const volume = realTimeData.type === "trade" ? realTimeData.data[0].v : "";
  let realTimeLastRefreshed =
    realTimeData.type === "trade" ? realTimeData.data[0].t : data.t * 1000;

  let lastRefreshed = convert(data.t * 1000);
  const classes = useStyles();

  function convert(unixTimestamp) {
    const dateObject = new Date(unixTimestamp);
    const humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
  }

  realTimeLastRefreshed = convert(realTimeLastRefreshed);

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <RealTimeQuote
          realTimeData={realTimeData}
          data={data}
          price={price}
          realTimeLastRefreshed={realTimeLastRefreshed}
          currentInstrument={currentInstrument}
          volume={volume}
        />
      </Paper>
      <Paper className={classes.paper}>
        <Quote data={data} lastRefreshed={lastRefreshed} />
      </Paper>
    </React.Fragment>
  );
};

export default InstrumentQuote;
