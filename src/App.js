import React from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Instruments from "./components/instruments";
import "./App.css";

function App() {
  return (
    <Box className="App">
      <Container fixed>
        <Instruments />
      </Container>
    </Box>
  );
}

export default App;
