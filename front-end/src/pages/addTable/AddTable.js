import React, { useState, useEffect } from "react";
import Wrapper from "./AddTable.style";

import FormRow from "../../layout/FormRow.js";
import { useNavigate } from "react-router-dom";

import ErrorAlert from "../../layout/ErrorAlert.js";

const initialValues = {
  name: "",
  capacity: 1,
};

const AddTable = () => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { capacity, name } = values;

    if (!capacity || !name) {
      setError("Fill all required fields!");
    } else {
      setSubmit(true);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Add Table</h3>
        {error && <ErrorAlert error={{ message: error }} />}
        <FormRow
          type="text"
          name="name"
          placeholder="Table Name"
          value={values.name}
          handleChange={handleChange}
        ></FormRow>

        <FormRow
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={values.capacity}
          handleChange={handleChange}
          min="1"
        ></FormRow>

        <button className="btn btn-blok" type="submit">
          <h5>Submit</h5>
        </button>

        <button
          className="btn btn-blok"
          type="button"
          onClick={() => navigate("/")}
        >
          <h5>Cancel</h5>
        </button>
      </form>
    </Wrapper>
  );
};

export default AddTable;
