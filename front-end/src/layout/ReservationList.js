import React from "react";

import ReservationCard from "./ReservationCard";

const ReservationList = ({ reservations }) => {
  const renderCards = reservations.map((reservation) => (
    <ReservationCard reservation={reservation} />
  ));

  return <div>{renderCards}</div>;
};

export default ReservationList;
