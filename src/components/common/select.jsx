// import React from "react";

// const SelectInput = ({ name, label, options, error, ...rest }) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <select name={name} id={name} {...rest} className="form-control">
//         <option value="" />
//         {options.map(option => (
//           <option key={option._id} value={option._id}>
//             {option.name}
//           </option>
//         ))}
//       </select>
//       {error && <div className="alert alert-danger">{error}</div>}
//     </div>
//   );
// };

// export default SelectInput;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectItem({ name, label, options, error, ...rest }) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        {/* <InputLabel id={name}>{label}</InputLabel>
        <Select id={name} labelId={name} {...rest}>
          <MenuItem value="" />
          {options.map((o) => (
            <MenuItem key={o._id} value={o._id}>
              {o.name}
            </MenuItem>
          ))}
        </Select>
        {error && <div className="alert alert-danger">{error}</div>} */}
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
