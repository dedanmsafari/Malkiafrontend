// import React from "react";

// const Input = ({ name, label, error, ...rest }) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <input {...rest} name={name} id={name} className="form-control" />
//       {error && <div className="alert alert-danger">{error}</div>}
//     </div>
//   );
// };
// 
// export default Input;
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
    <div className={classes.root} noValidate >
      <TextField
        {...rest}
        error={error}
        name={name}
        id={name}
        label={label}
        helperText={error}
        variant="outlined"
      />
    </div>
  );
}
