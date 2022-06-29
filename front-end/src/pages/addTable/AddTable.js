import React, { useState, useEffect } from "react";
import Wrapper from "./AddTable.style";

import FormRow from "../../layout/FormRow.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ErrorAlert from "../../layout/ErrorAlert.js";
import { addTable } from "../../features/reservation/reservationSlice";

const initialValues = {
  name: "",
  capacity: 1,
};

const AddTable = () => {
  const { api_error, isLoading, current_table } = useSelector(
    (store) => store.reservation
  );
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(api_error);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(api_error);
  }, [api_error]);

  useEffect(() => {
    if (submit && current_table) {
      navigate("/dashboard");
      setSubmit(false);
    }
  }, [submit, navigate, dispatch, values, current_table]);

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
      dispatch(addTable(values));
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

        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <button className="btn btn-blok" type="submit">
            <h5>Submit</h5>
          </button>
        )}
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
