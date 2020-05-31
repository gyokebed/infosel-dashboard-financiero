import React from "react";
import SearchBox from "./searchBox";
import InstrumentsTable from "./instrumentsTable";
import PaginationContainer from "./common/pagination";

const InstrumentsDirectory = ({
  handleSearch,
  handlePageChange,
  totalCount,
  pageSize,
}) => {
  return (
    <React.Fragment>
      <SearchBox />
      <InstrumentsTable />
      <PaginationContainer
        itemsCount={totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default InstrumentsDirectory;
