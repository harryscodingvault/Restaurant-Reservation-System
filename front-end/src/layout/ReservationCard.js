import React from "react";

import Wrapper from "./ReservationCard.style";

const ReservationCard = ({ reservation }) => {
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
    status,
  } = reservation;

  return <Wrapper>{first_name}</Wrapper>;
};

export default ReservationCard;
