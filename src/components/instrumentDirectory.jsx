import React from "react";
import SearchBox from "./searchBox";
import InstrumentsTable from "./instrumentsTable";
import PaginationContainer from "./common/pagination";

const InstrumentsDirectory = ({
  searchQuery,
  handleSearch,
  handlePageChange,
  totalCount,
  pageSize,
}) => {
  return (
    <React.Fragment>
      <SearchBox value={searchQuery} onChange={handleSearch} />
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
