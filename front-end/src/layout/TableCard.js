import React, { useState, useEffect } from "react";
import Wrapper from "./TableCard.style";

import ErrorAlert from "./ErrorAlert";
import { freeTable } from "../utils/api";

const TableCard = ({ table, refreshHandler }) => {
  const { table_name, capacity, reservation_id, table_id } = table;
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");
  const [reservation, setReservation] = useState(null);
  const [activateDialog, setActivateDialog] = useState(false);

  useEffect(() => {
    if (submit === true && reservation) {
      refreshHandler(true);
      setSubmit(false);
    }
  }, [submit, refreshHandler, reservation]);

  const finishHandler = () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      freeTable(table_id).then(setReservation).catch(setError);
      setSubmit(true);
    }
  };

  return (
    <Wrapper>
      <div className="row">
        <div className="text-group">
          <p className="label">Name: </p>
          <p>{table_name}</p>
        </div>
        <div className="text-group">
          <p className="label">Capacity: </p>
          <p>{capacity}</p>
        </div>
        <div className="text-group">
          <p className="label">Status: </p>

          <p data-table-id-status={table_id}>
            {reservation_id ? "Occupied" : "Free"}
          </p>
        </div>
      </div>

      {reservation_id && (
        <>
          {error && <ErrorAlert error={{ message: error }} />}
          <button
            className="btn"
            onClick={() => finishHandler()}
            data-table-id-finish={table_id}
          >
            Finish
          </button>
        </>
      )}
    </Wrapper>
  );
};

export default TableCard;
