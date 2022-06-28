import React from "react";
import Wrapper from "./TableCard.style";

const TableCard = ({ table }) => {
  const { name, capacity, reservation_id } = table;

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
    </Wrapper>
  );
};

export default TableCard;
