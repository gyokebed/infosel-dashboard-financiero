import React, { useState, useEffect } from "react";
import axios from "axios";
import InstrumentsTable from "./instrumentsTable";
import PaginationContainer from "./common/pagination";
import { instruments } from "../utils/instruments";
import { paginate } from "../utils/paginate";

const apiKey = "A1TYJ6O8KY63WSSK";
const instrument = instruments[0].symbol;
const pageSize = 5;

const Instruments = () => {
  const [data, setData] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${instrument}&interval=5min&apikey=demo`
      )
      .then((res) => {
        setData(res.data);
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
    const instrum = paginate(instruments, currentPage, pageSize);
    return { totalCount: instruments.length, instrum };
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { totalCount, instrum } = getPagedData();

  return (
    <React.Fragment>
      <InstrumentsTable
        data={data}
        instruments={instrum}
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
