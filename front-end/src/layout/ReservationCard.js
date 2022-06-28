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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (time) => {
    let str = time.split(":");
    let hour = str[0] % 12 || 12;
    let min = str[1];
    let timeOfDay = hour >= 12 ? "AM" : "PM";
    return `${hour}:${min} ${timeOfDay}`;
  };

  return (
    <Wrapper>
      <div className="row">
        <div className="text-group">
          <p className="label">Name: </p>
          <p>{first_name}</p> <p>{last_name}</p>
        </div>
        <div className="text-group">
          <p className="label">Phone: </p>
          <p>{mobile_number}</p>
        </div>
      </div>
      <div className="row">
        <div className="text-group">
          <p className="label">Date: </p>
          <p>{formatDate(reservation_date)}</p>
        </div>
        <div className="text-group">
          <p className="label">Time: </p>
          <p>{formatTime(reservation_time)}</p>
        </div>
      </div>
      <div className="row">
        <div className="text-group">
          <p className="label">Number of people: </p>
          <p>{people}</p>
        </div>

        <div className="text-group">
          <p className="label">Status: </p>
          <p>{status}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default ReservationCard;