import React, { useState, useEffect } from "react";
import { Grid, Paper, Container } from "@material-ui/core";

import { useStyles } from "../Dashboard";
import InstrumentQuote from "./instrumentQuote";
import InstrumentChart from "./instrumentChart";
import HistoricPricesTable from "./historicPricesTable";
import { paginate } from "../utils/paginate";
import {
  getListOfInstruments,
  getDataFromAnInstrument,
  updateMonthlyData,
  getMonthlyData,
} from "../services/instrumentsService";
import InstrumentsDirectory from "./instrumentDirectory";

const token = "br7cj5nrh5r9l4n3osvg";
const pageSize = 3;
let socket;

const Instruments = () => {
  const classes = useStyles();
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
    <main className={classes.content}>
      <div className={classes.appBarSpacer}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Search Box and Instruments Table */}
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper}>
                <InstrumentsDirectory
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                  handleClick={handleClick}
                  handlePageChange={handlePageChange}
                  instrumentData={instrumentData}
                  filteredData={filteredData}
                  totalCount={totalCount}
                  pageSize={pageSize}
                />
              </Paper>
            </Grid>
            {/* Instrument Info */}
            <Grid
              item
              xs={12}
              md={4}
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <InstrumentQuote
                realTimeData={realTimeData}
                data={instrumentData}
                currentInstrument={currentInstrument}
              />
            </Grid>
            {/* Monthly Chart */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <InstrumentChart
                  data={monthtlyData}
                  currentInstrument={currentInstrument}
                />
              </Paper>
            </Grid>
            {/* Historic Prices */}
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                style={{ height: 400, width: "100%" }}
              >
                <HistoricPricesTable instruments={monthtlyData} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </main>
  );
};

export default Instruments;
