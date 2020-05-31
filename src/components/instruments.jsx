import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InstrumentsTable from "./instrumentsTable";
import InstrumentInfo from "./instrumentInfo";
import InstrumentChart from "./instrumentChart";
import PaginationContainer from "./common/pagination";
import ReactVirtualizedTable from "./historicPricesTable";
import SearchBox from "./searchBox";
import { paginate } from "../utils/paginate";
import {
  getListOfInstruments,
  getDataFromAnInstrument,
  updateMonthlyData,
  getMonthlyData,
} from "../services/instrumentsService";

const token = "br7cj5nrh5r9l4n3osvg";
const pageSize = 5;
let socket;

const Instruments = () => {
  const [instruments, setInstruments] = useState([]);
  const [instrumentData, setInstrumentData] = useState("");
  const [realTimeData, setRealTimeData] = useState("");
  const [currentInstrument, setCurrentInstrument] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [monthtlyData, setMonthtlyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getData() {
      // Get list of instruments
      const { data: listOfInstrumentsResult } = await getListOfInstruments();
      const firstIntrumentOnList = listOfInstrumentsResult[0].symbol;
      setInstruments(listOfInstrumentsResult);
      // Set the current instrument state to first symbol of the retrieved array
      setCurrentInstrument(firstIntrumentOnList);

      // Get data from an instrument
      const { data: instrumentDataResult } = await getDataFromAnInstrument(
        firstIntrumentOnList
      );
      // Set instrument data and real time data
      setInstrumentData(instrumentDataResult);
      setRealTimeData(instrumentDataResult);

      // Set monthly data
      const monthlyDataResult = await getMonthlyData(firstIntrumentOnList);
      setMonthtlyData(updateMonthlyData(monthlyDataResult));

      // New instance of websocket to connect real time data

      socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);

      // Connection opened -> Subscribe
      socket.addEventListener("open", function (event) {
        subscribe(firstIntrumentOnList);
      });

      // Listen for messages
      socket.addEventListener("message", function (event) {
        const receivedData = JSON.parse(event.data);
        if (receivedData.type === "trade") setRealTimeData(receivedData);
      });
    }

    getData();
  }, []);

  // Initial Subscription
  const subscribe = (instrument) => {
    socket.send(JSON.stringify({ type: "subscribe", symbol: instrument }));
  };

  // Unsubscribe
  const unsubscribe = function (instrument) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: instrument }));
  };

  const handleClick = async (instrument) => {
    unsubscribe(currentInstrument);

    subscribe(instrument);

    // Get data from an instrument
    const { data: instrumentDataResult } = await getDataFromAnInstrument(
      instrument
    );
    // Set instrument data and real time data
    setInstrumentData(instrumentDataResult);
    setRealTimeData(instrumentDataResult);

    // Set monthly data
    const monthlyDataResult = await getMonthlyData(instrument);
    setMonthtlyData(updateMonthlyData(monthlyDataResult));

    setCurrentInstrument(instrument);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = [...instruments];
    if (searchQuery)
      filtered = instruments.filter(
        (instrument) =>
          instrument.symbol
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          instrument.description
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase())
      );

    const filteredData = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered.length, filteredData };
  };

  const { totalCount, filteredData } = getPagedData();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <SearchBox value={searchQuery} onChange={handleSearch} />
          <InstrumentsTable
            data={instrumentData}
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
          <InstrumentInfo
            realTimeData={realTimeData}
            data={instrumentData}
            currentInstrument={currentInstrument}
          />
        </Grid>
      </Grid>
      <InstrumentChart
        data={monthtlyData}
        currentInstrument={currentInstrument}
      />
      <ReactVirtualizedTable instruments={monthtlyData} />
    </React.Fragment>
  );
};

export default Instruments;
