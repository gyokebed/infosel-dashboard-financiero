import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import InstrumentsTable from "./instrumentsTable";
import InstrumentInfo from "./instrumentInfo";
import PaginationContainer from "./common/pagination";
import { fakeInstruments } from "../utils/instruments";
import { paginate } from "../utils/paginate";

const apiKey = "A1TYJ6O8KY63WSSK";
const token = "br7cj5nrh5r9l4n3osvg";
const pageSize = 5;

const Instruments = () => {
  const [instruments, setInstruments] = useState(fakeInstruments);
  const [data, setData] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // API call -> Retrieve Symbols from Finnhub
  useEffect(() => {
    axios
      .get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${token}`)
      .then((res) => {
        setInstruments(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${instruments[0].symbol}&interval=5min&apikey=demo`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);

    // Connection opened -> Subscribe
    socket.addEventListener("open", function (event) {
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: instruments[0].symbol })
      );
    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);
    });
  });

  const handleClick = (instrument) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${instrument}&interval=5min&apikey=${apiKey}`
      )
      .then((res) => {
        setData(res.data);
      });
  };

  const getPagedData = () => {
    const filteredData = paginate(instruments, currentPage, pageSize);
    return { totalCount: instruments.length, filteredData };
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { totalCount, filteredData } = getPagedData();

  return (
    <Grid container spacing={3}>
      <Grid item sm={6}>
        <InstrumentsTable
          data={data}
          instruments={filteredData}
          onClick={handleClick}
        />
        <PaginationContainer
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Grid>
      <Grid item sm={6}>
        <InstrumentInfo data={data} />
      </Grid>
    </Grid>
  );
};

export default Instruments;
