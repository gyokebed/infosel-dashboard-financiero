import React from "react";
import { instruments } from "../utils/instruments";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

function createData(symbol, name) {
  return { symbol, name };
}

// const rows = [createData("IBM", "HOla ibm"), createData("AA", "HOla AA")];

const rows = instruments.map((instrument) => {
  return createData(instrument.symbol, instrument.name);
});

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function InstrumentsTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Symbol</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.symbol}>
              <StyledTableCell component="th" scope="row">
                {row.symbol}
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InstrumentsTable;
