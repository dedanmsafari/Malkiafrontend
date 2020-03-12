import React from "react";

const Text = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea  className="form-control" {...rest} name={name} id={name} rows="5" ></textarea>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Text;
