import React from "react";

import ReservationCard from "./ReservationCard";

const ReservationList = ({ reservations, refreshHandler }) => {
  let sortedArray = [...reservations];
  sortedArray = sortedArray.sort((a, b) =>
    a.reservation_time > b.reservation_time ? 1 : -1
  );

  const renderCards = sortedArray.map((reservation) => {
    return (
      <ReservationCard
        reservation={reservation}
        key={reservation.reservation_id}
        refreshHandler={(state) => refreshHandler(state)}
      />
    );
  });

  return <div>{renderCards}</div>;
};

export default ReservationList;
