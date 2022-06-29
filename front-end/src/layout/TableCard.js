import React, { useState, useEffect } from "react";
import Wrapper from "./TableCard.style";

import { useDispatch, useSelector } from "react-redux";
import { freeTable, getTables } from "../features/reservation/reservationSlice";
import ErrorAlert from "./ErrorAlert";
import { useNavigate } from "react-router-dom";

const TableCard = ({ table }) => {
  const { name, capacity, reservation_id } = table;
  const { current_table, api_error } = useSelector(
    (store) => store.reservation
  );
  const [error, setError] = useState(api_error);
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (current_table && !error && submit) {
      dispatch(getTables());
      navigate("/dashboard");
    }
  }, [current_table, error, submit, navigate, dispatch]);

  useEffect(() => {
    setError(api_error);
  }, [api_error]);

  const finishHandler = () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests?\n\nThis cannot be undone."
      )
    ) {
      dispatch(freeTable(table.table_id));
      setSubmit(true);
    }
  };

  return (
    <Wrapper>
      <div className="row">
        <div className="text-group">
          <p className="label">Name: </p>
          <p>{name}</p>
        </div>
        <div className="text-group">
          <p className="label">Capacity: </p>
          <p>{capacity}</p>
        </div>
        <div className="text-group">
          <p className="label">Status: </p>
          {reservation_id ? (
            <p className={`data-table-id-status=${table.table_id}`}>Occupied</p>
          ) : (
            <p className={`data-table-id-status=${table.table_id}`}>Free</p>
          )}
        </div>
      </div>
      {reservation_id && (
        <>
          {error && <ErrorAlert error={{ message: error }} />}
          <div
            className={` btn data-table-id-finish=${table.table_id}`}
            onClick={() => finishHandler()}
          >
            Finish
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default TableCard;
