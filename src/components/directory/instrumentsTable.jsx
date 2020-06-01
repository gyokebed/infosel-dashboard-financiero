import React, { useContext } from "react";
import DirectoryContext from "../../context/directoryContext";
import BasicTable from "../common/basicTable";

function InstrumentsTable() {
  const { instrumentsList, onClick } = useContext(DirectoryContext);

  const headerColumns = [{ label: "Símbolo" }, { label: "Nombre" }];

  const rows = instrumentsList.map((instrument) => {
    return {
      symbol: instrument.symbol,
      name: instrument.description || instrument.displaySymbol,
    };
  });

  return (
    <BasicTable rows={rows} onClick={onClick} headerColumns={headerColumns} />
  );
}

export default InstrumentsTable;
