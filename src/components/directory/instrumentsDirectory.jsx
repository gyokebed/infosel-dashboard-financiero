import React from "react";
import SearchBox from "../common/searchBox";
import InstrumentsTable from "./instrumentsTable";
import PaginationContainer from "../common/pagination";

const InstrumentsDirectory = () => {
  return (
    <React.Fragment>
      <SearchBox />
      <InstrumentsTable />
      <PaginationContainer />
    </React.Fragment>
  );
};

export default InstrumentsDirectory;
