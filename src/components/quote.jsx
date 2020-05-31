import React from "react";
import Typography from "@material-ui/core/Typography";

const Quote = ({ data, lastRefreshed }) => {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Cotización
      </Typography>
      <Typography color="textSecondary">
        Precio de apertura: {data.o}
      </Typography>
      <Typography color="textSecondary">Precio máximo: {data.h}</Typography>
      <Typography color="textSecondary">Precio mínimo: {data.l}</Typography>
      <Typography color="textSecondary">
        Precio de cierre previo: {data.pc}
      </Typography>
      <Typography color="textSecondary">
        Última actualización: {lastRefreshed}
      </Typography>
    </React.Fragment>
  );
};

export default Quote;
