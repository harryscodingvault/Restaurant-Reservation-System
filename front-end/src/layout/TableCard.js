import React, { useState, useEffect } from "react";
import Wrapper from "./TableCard.style";

import ErrorAlert from "./ErrorAlert";
import { useNavigate } from "react-router-dom";

const TableCard = ({ table }) => {
  const { name, capacity, reservation_id } = table;

  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const finishHandler = () => {
    const reservationStatus = {
      reservationId: table.reservation_id,
      status: "finished",
    };

    if (
      window.confirm(
        "Is this table ready to seat new guests?\n\nThis cannot be undone."
      )
    ) {
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
