import React, { useState } from "react";
import Wrapper from "./TableCard.style";

import ErrorAlert from "./ErrorAlert";
import { freeTable } from "../utils/api";

const TableCard = ({ table, refreshHandler }) => {
  const { table_name, capacity, reservation_id, table_id } = table;

  const [error, setError] = useState("");
  const [reservationId, setReservationId] = useState(reservation_id);

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
      freeTable(table_id)
        .then((res) => setReservationId(res.data.reservation_id))
        .catch(setError);
      refreshHandler(true);
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
          {reservationId ? (
            <p className={`data-table-id-status=${table.table_id}`}>Occupied</p>
          ) : (
            <p className={`data-table-id-status=${table.table_id}`}>Free</p>
          )}
        </div>
      </div>
      {reservationId && (
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
