import React, { useState, useEffect } from "react";
import Wrapper from "./SelectTables.style";

import { useNavigate, useParams } from "react-router-dom";

import ErrorAlert from "../../layout/ErrorAlert.js";

import { getTables, seatTable, getReservation } from "../../utils/api";

const initialValues = {
  table_id: null,
};

const SelectTables = () => {
  const [error, setError] = useState("");
  const [reservation, setReservation] = useState(null);
  const [tables, setTables] = useState([]);
  const [values, setValues] = useState({
    initialValues,
  });
  const [noTables, setNoTables] = useState(false);
  const navigate = useNavigate();
  const { reservationId } = useParams();

  useEffect(() => {
    if (!error && reservation?.status === "seated") {
      navigate("/dashboard");
    }
  }, [navigate, error, reservation]);

  const loadTables = () => {
    let isMounted = true;
    const abortController = new AbortController();
    setError(null);

    getReservation(reservationId)
      .then((res) => {
        if (isMounted) {
          setReservation(res.data);
        }
      })
      .catch(setError);

    getTables()
      .then((res) => {
        if (isMounted) {
          /* const filteredTables = res.data.filter(
            (table) =>
              table?.capacity >= reservation?.people &&
              table?.reservation_id === null
          );*/
          setTables(res.data);
          setValues({ table_id: res.data?.[0]?.table_id });
        }
      })
      .catch(setError);

    return () => {
      isMounted = false;
      abortController.abort();
    };
  };

  useEffect(loadTables, [reservation?.people, reservationId]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { table_id } = values;
    console.log(values);
    const data = { tableId: table_id, reservationId };

    if (!table_id) {
      setError("Select a table!");
    } else {
      setError(null);
      seatTable(data).then(setReservation).catch(setError);
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
                name="table_id"
                id="table_id"
                values={values.table}
                onChange={handleChange}
                className="form-select"
              >
                {tables.map((table, index) => {
                  const { table_name, capacity, table_id } = table;
                  return (
                    <option key={index} value={table_id}>
                      {table_name} - {capacity}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className="btn btn-blok" type="submit">
              <h5>Submit</h5>
            </button>
          </>
        )}
        <button
          className="btn btn-blok"
          type="button"
          onClick={() => navigate(`/dashboard?date=${values.reservation_date}`)}
        >
          <h5>Cancel</h5>
        </button>
      </form>
    </Wrapper>
  );
};

export default SelectTables;
