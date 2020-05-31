import React, { useContext } from "react";
import InstrumentsContext from "../context/instrumentsContext";
import {
  withStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});

function InstrumentsTable({ onClick }) {
  const classes = useStyles();
  const instruments = useContext(InstrumentsContext);

  const rows = instruments.map((instrument) => {
    return {
      symbol: instrument.symbol,
      name: instrument.description || instrument.displaySymbol,
    };
  });

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Symbol</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <TableCell component="th" scope="row">
                <Button
                  variant="contained"
                  color="primary"
                  key={index}
                  onClick={() => {
                    onClick(row.symbol);
                  }}
                >
                  {row.symbol}
                </Button>
              </TableCell>
              <TableCell>{row.name}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InstrumentsTable;
