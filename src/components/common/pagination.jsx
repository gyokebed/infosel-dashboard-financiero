import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import DirectoryContext from "../../context/directoryContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
  },
}));

const PaginationContainer = () => {
  const classes = useStyles();
  const { onPageChange, totalCount, pageSize } = useContext(DirectoryContext);
  const pagesCount = Math.ceil(totalCount / pageSize);
  if (pagesCount === 1 || !pagesCount) return null;

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

export default PaginationContainer;
