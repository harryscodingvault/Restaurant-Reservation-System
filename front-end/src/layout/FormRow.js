import React from "react";

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
  );
};

export default FormRow;
