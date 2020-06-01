import React, { useContext } from "react";
import QuoteContext from "../context/quoteContext";
import Typography from "@material-ui/core/Typography";

const RealTimeQuote = () => {
  const {
    realTimeData,
    price,
    volume,
    realTimeLastRefreshed,
    currentInstrument,
  } = useContext(QuoteContext);
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Cotización (Tiempo Real)
      </Typography>
      <Typography component="p" variant="h4">
        {realTimeData ? currentInstrument : ""}
      </Typography>
      <Typography color="textSecondary">
        Precio: {realTimeData ? price : ""}
      </Typography>
      <Typography color="textSecondary">
        Ultima actualización: {realTimeData ? realTimeLastRefreshed : ""}
      </Typography>
      {volume ? (
        <Typography color="textSecondary">Volumen: {volume}</Typography>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default RealTimeQuote;
