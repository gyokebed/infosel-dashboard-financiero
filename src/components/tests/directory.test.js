import React from "react";
import { shallow, mount } from "../../enzyme";
import { AppBar } from "@material-ui/core";
import Dashboard from "../../Dashboard";
import BasicTable from "../common/basicTable";
import InstrumentsDirectory from "../directory/instrumentsDirectory";
import InstrumentsTable from "../directory/instrumentsTable";
import Instruments from "../instruments";
import InstrumentQuote from "../quote/instrumentQuote";
import SearchBox from "../common/searchBox";
import PaginationContainer from "../common/pagination";

describe("Dashboard tests", () => {
  it("renders Dashboard", () => {
    const wrapper = shallow(<Dashboard />);

    expect(wrapper.find(AppBar).length).toBe(1);
    expect(wrapper.find(Instruments).length).toBe(1);
  });

  it("renders Instruments", () => {
    const wrapper = shallow(<Instruments />);

    expect(wrapper.find(InstrumentsDirectory).length).toBe(1);
    expect(wrapper.find(InstrumentQuote).length).toBe(1);
  });

  it("renders InstrumentsDirectory", () => {
    const wrapper = shallow(<InstrumentsDirectory />);

    expect(wrapper.find(SearchBox).length).toBe(1);
    expect(wrapper.find(InstrumentsTable).length).toBe(1);
    expect(wrapper.find(PaginationContainer).length).toBe(1);
  });

  it("tests BasicTable", () => {
    const instrumentsList = [
      {
        description: "AGILENT TECHNOLOGIES INC",
        displaySymbol: "A",
        symbol: "A",
      },
    ];

    const onClick = () => {
      console.log("Click");
    };

    const rows = instrumentsList.map((instrument) => {
      return {
        symbol: instrument.symbol,
        name: instrument.description || instrument.displaySymbol,
      };
    });
    const headerColumns = [{ label: "Símbolo" }, { label: "Nombre" }];
    const wrapper = mount(
      <BasicTable rows={rows} headerColumns={headerColumns} onClick={onClick} />
    );

    // Expect the wrapper object to be defined
    expect(wrapper.find(".MuiTableBody-root")).toBeDefined();
    // Have lenght of rows +1 in order to include thead row
    expect(wrapper.find(".MuiTableRow-root")).toHaveLength(rows.length + 1);
    // console.log(wrapper.debug());
  });
});
