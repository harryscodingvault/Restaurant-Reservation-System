import React from "react";
import Wrapper from "./FormRow.style.js";

const FormRow = ({
  type,
  name,
  placeholder,
  value,
  handleChange,
  min,
  max,
  pattern,
}) => {
  return (
    <div className="form-row">
      <input
        className="form-input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        pattern={pattern}
      ></input>
    </div>
  );
};

export default FormRow;
