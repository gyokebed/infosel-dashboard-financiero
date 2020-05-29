import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import InstrumentsTable from "./instrumentsTable";
import InstrumentInfo from "./instrumentInfo";
import InstrumentChart from "./instrumentChart";
import PaginationContainer from "./common/pagination";
import { paginate } from "../utils/paginate";
import {
  getListOfInstruments,
  getDataFromAnInstrument,
  updateMonthlyData,
} from "../services/instrumentsService";

const apiKey = "A1TYJ6O8KY63WSSK";
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

      const monthlyDataResult = await axios(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${firstIntrumentOnList}&apikey=${apiKey}`
      );

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
        // console.log("Message from server ", receivedData);
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

    const monthlyDataResult = await axios(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${instrument}&apikey=${apiKey}`
    );

    setMonthtlyData(updateMonthlyData(monthlyDataResult));

    setCurrentInstrument(instrument);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPagedData = () => {
    const filteredData = paginate(instruments, currentPage, pageSize);
    return { totalCount: instruments.length, filteredData };
  };

  const { totalCount, filteredData } = getPagedData();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item sm={6}>
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
    </React.Fragment>
  );
};

export default Instruments;
