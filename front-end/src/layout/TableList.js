import React from "react";
import Wrapper from "./TableList.style";

import TableCard from "./TableCard";

const TableList = ({ tables, refreshHandler }) => {
  let sortedArray = [...tables];
  sortedArray = sortedArray.sort((a, b) => (a.name > b.name ? 1 : -1));

  const renderCards = sortedArray.map((table) => {
    return (
      <TableCard
        table={table}
        key={table.table_id}
        refreshHandler={(state) => refreshHandler(state)}
      />
    );
  });

  return <Wrapper>{renderCards}</Wrapper>;
};

export default TableList;
