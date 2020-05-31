import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
  },
}));

const PaginationContainer = ({ itemsCount, pageSize, onPageChange }) => {
  const classes = useStyles();
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  return (
    <div className={classes.root}>
      <Pagination
        count={pagesCount}
        color="primary"
        onChange={(event, value) => onPageChange(value)}
      />
    </div>
  );
};

PaginationContainer.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationContainer;
