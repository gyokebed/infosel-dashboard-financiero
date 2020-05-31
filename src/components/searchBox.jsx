import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: "100%",
    },
  },
}));

const SearchBox = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-search"
          label="Buscar"
          type="search"
          variant="outlined"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
    </form>
  );
};

export default SearchBox;
