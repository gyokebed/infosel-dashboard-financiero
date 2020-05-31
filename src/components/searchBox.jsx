import React, { useContext } from "react";
import InstrumentsContext from "../context/instrumentsContext";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: "100%",
    },
  },
}));

const SearchBox = () => {
  const classes = useStyles();
  const { searchQuery, onSearch } = useContext(InstrumentsContext);
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-search"
          label="Buscar"
          type="search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => onSearch(e.currentTarget.value)}
        />
      </div>
    </form>
  );
};

export default SearchBox;
