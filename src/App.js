import React from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Instruments from "./components/instruments";
import "./App.css";

function App() {
  return (
    <Box className="App">
      <Container fixed>
        <Grid item sm={8}>
          <Instruments />
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
