import React, { useState, useEffect } from "react";
import Wrapper from "./SelectTables.style";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ErrorAlert from "../../layout/ErrorAlert.js";
import { addTable } from "../../features/reservation/reservationSlice";

const initialValues = {
  table: "",
};

const SelectTables = () => {
  const { api_error, isLoading, table_list } = useSelector(
    (store) => store.reservation
  );
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(api_error);
  const [submit, setSubmit] = useState(false);
  const [tables, setTables] = useState(table_list || []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(api_error);
  }, [api_error]);

  useEffect(() => {
    if (tables === [] || table_list === null) {
      navigate("/dashboard");
    }
    //setSubmit(false);
  }, [tables, navigate, table_list]);

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
      console.log(values);
      dispatch(addTable(values));
      setSubmit(true);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Select Table</h3>
        {error && <ErrorAlert error={{ message: error }} />}
        <div className="form-row form-row-select">
          <select
            name="table"
            id="table"
            values={values.table}
            onChange={handleChange}
            className="form-select"
          >
            {tables.map((table, index) => {
              const { name, capacity } = table;
              return (
                <option key={index} value={capacity}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>

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

export default SelectTables;
