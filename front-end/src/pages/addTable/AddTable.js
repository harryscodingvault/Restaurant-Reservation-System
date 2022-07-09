import React, { useState, useEffect } from "react";
import Wrapper from "./AddTable.style";

import FormRow from "../../layout/FormRow.js";
import { useNavigate } from "react-router-dom";
import { addTable } from "../../utils/api";

import ErrorAlert from "../../layout/ErrorAlert.js";

const initialValues = {
  table_name: "",
  capacity: 0,
};

const AddTable = () => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [table, setTable] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!error && table) {
      navigate(`/dashboard`);
      setTable(null);
    }
  }, [navigate, error, table]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { capacity, table_name } = values;

    if (!capacity || !table_name) {
      setError("Fill all required fields!");
    } else {
      setError(null);
      addTable({ table_name, capacity: Number(capacity) })
        .then(setTable)
        .catch(setError);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Add Table</h3>
        {error && <ErrorAlert error={{ message: error }} />}
        <FormRow
          type="text"
          name="table_name"
          placeholder="Table Name"
          value={values.table_name}
          handleChange={handleChange}
        ></FormRow>

        <FormRow
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={values.capacity}
          handleChange={handleChange}
        ></FormRow>

        <button className="btn btn-blok" type="submit">
          Submit
        </button>

        <button
          className="btn btn-blok"
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </Wrapper>
  );
};

export default AddTable;
