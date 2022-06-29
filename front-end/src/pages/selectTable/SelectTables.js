import React, { useState, useEffect } from "react";
import Wrapper from "./SelectTables.style";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ErrorAlert from "../../layout/ErrorAlert.js";
import { seatTable } from "../../features/reservation/reservationSlice";

const initialValues = {
  table: null,
};

const SelectTables = () => {
  const { api_error, isLoading, table_list, reservation_list, current_table } =
    useSelector((store) => store.reservation);
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(api_error);
  const [submit, setSubmit] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [tables, setTables] = useState([]);
  const [noTables, setNoTables] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reservationId } = useParams();

  useEffect(() => {
    setError(api_error);
    if (noTables === true) setError("No tables Available");
  }, [api_error, noTables]);

  useEffect(() => {
    if (
      tables === [] ||
      table_list === null ||
      (current_table && !error && submit)
    ) {
      navigate("/dashboard");
    }
  }, [
    tables,
    navigate,
    table_list,
    currentReservation,
    current_table,
    error,
    submit,
  ]);

  useEffect(() => {
    const reservation = reservation_list?.find((reservation) => {
      return reservation.reservation_id === Number(reservationId);
    });
    const filteredTables = table_list?.filter(
      (table) =>
        table.capacity >= currentReservation?.people &&
        table.reservation_id === null
    );
    setTables(filteredTables);
    setCurrentReservation(reservation);
    if (filteredTables?.length) {
      filteredTables[0]
        ? setValues({ table: filteredTables[0]?.table_id })
        : setNoTables(true);
    }
  }, [reservationId, reservation_list, table_list, currentReservation]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { table } = values;
    const data = { table: table, reservation: reservationId };

    if (!table) {
      setError("Select a table!");
    } else {
      dispatch(seatTable(data));
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

            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <button className="btn btn-blok" type="submit">
                <h5>Submit</h5>
              </button>
            )}
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
