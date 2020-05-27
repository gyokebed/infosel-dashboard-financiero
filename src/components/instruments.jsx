import React, { useState, useEffect } from "react";
import axios from "axios";
import InstrumentsTable from "./instrumentsTable";
import PaginationContainer from "./common/pagination";
import { fakeInstruments } from "../utils/instruments";
import { paginate } from "../utils/paginate";

const apiKey = "A1TYJ6O8KY63WSSK";
const instrument = fakeInstruments[0].symbol;
const pageSize = 5;

const socket = new WebSocket("wss://ws.finnhub.io?token=br7cj5nrh5r9l4n3osvg");
console.log(socket);

// Connection opened -> Subscribe
socket.addEventListener("open", function (event) {
  socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});

const Instruments = () => {
  const [data, setData] = useState("");
  const [instruments, setInstruments] = useState(fakeInstruments);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${instrument}&interval=5min&apikey=demo`
      )
      .then((res) => {
        setData(res.data);
      });

    axios
      .get(
        `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=br7cj5nrh5r9l4n3osvg`
      )
      .then((res) => {
        setInstruments(res.data);
      });
  }, []);

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
  console.log(filteredData);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Instruments;
