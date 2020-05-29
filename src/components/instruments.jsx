import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import InstrumentsTable from "./instrumentsTable";
import InstrumentInfo from "./instrumentInfo";
import InstrumentsChart from "./instrumentsChart";
import PaginationContainer from "./common/pagination";
import { paginate } from "../utils/paginate";

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

  // API call -> Retrieve Symbols from Finnhub
  useEffect(() => {
    async function getData() {
      const instrumentsResult = await axios(
        `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${token}`
      );
      setInstruments(instrumentsResult.data);

      setCurrentInstrument(instrumentsResult.data[0].symbol);

      const instrumentDataResult = await axios(
        `https://finnhub.io/api/v1/quote?symbol=${instrumentsResult.data[0].symbol}&token=${token}`
      );
      setRealTimeData(instrumentDataResult.data);
      setInstrumentData(instrumentDataResult.data);

      const result = await axios(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo`
      );

      let monthtlyArrayData = [];
      let monthtlyTimeSeries = Object.keys(result.data)[1];
      for (let key in result.data[monthtlyTimeSeries])
        monthtlyArrayData.push({
          Date: key,
          Open: result.data[monthtlyTimeSeries][key]["1. open"],
          High: result.data[monthtlyTimeSeries][key]["2. high"],
          Low: result.data[monthtlyTimeSeries][key]["3. low"],
          Close: result.data[monthtlyTimeSeries][key]["4. close"],
          // volume: result.data[monthtlyTimeSeries][key]["5. volume"],
        });
      setMonthtlyData(monthtlyArrayData.reverse());

      // New instance of websocket to connect real time data

      socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);

      // Connection opened -> Subscribe
      socket.addEventListener("open", function (event) {
        subscribe(instrumentsResult.data[0].symbol);
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

    const instrumentDataResult = await axios(
      `https://finnhub.io/api/v1/quote?symbol=${instrument}&token=${token}`
    );

    setRealTimeData(instrumentDataResult.data);
    setInstrumentData(instrumentDataResult.data);
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

      <InstrumentsChart
        data={monthtlyData}
        currentInstrument={currentInstrument}
      />
    </React.Fragment>
  );
};

export default Instruments;
