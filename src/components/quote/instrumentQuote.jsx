import React from "react";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../../Dashboard";
import RealTimeQuote from "./realTimeQuote";
import Quote from "./quote";

const InstrumentQuote = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <RealTimeQuote />
      </Paper>
      <Paper className={classes.paper}>
        <Quote />
      </Paper>
    </React.Fragment>
  );
};

export default InstrumentQuote;
