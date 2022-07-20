import React from "react";
import { TextField } from "@mui/material";


const InputField = ({ value, label, id, type, onChange, variant }) => (
  <div className="form-group">
    {/* {label && <label htmlFor="input-field">{label}</label>} */}
    <TextField
      label={label}
      variant={variant}
      id={id}
      type={type}
      value={value}
      className="form-control"
      onChange={onChange}
    />
  </div>
);

export default InputField;
