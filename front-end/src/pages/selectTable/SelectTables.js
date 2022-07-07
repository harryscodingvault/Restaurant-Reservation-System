import React, { useState, useEffect } from "react";
import Wrapper from "./SelectTables.style";

import { useNavigate, useParams } from "react-router-dom";

import ErrorAlert from "../../layout/ErrorAlert.js";

const initialValues = {
  table: null,
};

const SelectTables = () => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [tables, setTables] = useState([]);
  const [noTables, setNoTables] = useState(false);

  const navigate = useNavigate();

  const { reservationId } = useParams();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { table } = values;
    const data = { table: table, reservation: reservationId };
    const reservationStatus = {
      reservationId: reservationId,
      status: "seated",
    };

    if (!table) {
      setError("Select a table!");
    } else {
      setSubmit(true);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Select Table</h3>
        {error && <ErrorAlert error={{ message: error }} />}
        {!noTables && (
          <>
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
                      {name} - {capacity}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="spinner"></div>

            <button className="btn btn-blok" type="submit">
              <h5>Submit</h5>
            </button>
          </>
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
