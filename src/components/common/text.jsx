// import React from "react";

// const Text = ({ name, label, error, ...rest }) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <textarea  className="form-control" {...rest} name={name} id={name} rows="5" ></textarea>
//       {error && <div className="alert alert-danger">{error}</div>}
//     </div>
//   );
// };

// export default Text;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "55ch",
      color: 'green',
    },
    
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'blue',
      },
      '&:hover fieldset': {
        borderColor: 'pink',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
}));

export default function Input({ name, label, error, ...rest }) {
  const classes = useStyles();

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <TextField
        {...rest}
        error={error}
        name={name}
        id={name}
        multiline
        rows={4}
        label={label}
        helperText={error}
        variant="outlined"
      />
    </div>
  );
}
