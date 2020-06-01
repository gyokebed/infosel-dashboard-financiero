import React from "react";
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
  Typography,
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

const BasicTable = ({ rows, onClick, headerColumns }) => {
  const classes = useStyles();

  if (rows.length === 0)
    return (
      <Typography component="p">
        No hay información disponible para esta búsqueda.
      </Typography>
    );

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headerColumns.map((hColumn, index) => {
              return (
                <StyledTableCell key={index}>{hColumn.label}</StyledTableCell>
              );
            })}
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
};

export default BasicTable;
