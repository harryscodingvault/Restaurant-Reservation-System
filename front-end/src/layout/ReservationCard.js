import React, { useState } from "react";
import Wrapper from "./ReservationCard.style";

import { changeReservationStatus } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

const ReservationCard = ({ reservation, refreshHandler }) => {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
    status,
  } = reservation;
  const [error, setError] = useState(null);
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

  const cancelReservationHandler = () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const reservationStatus = {
        reservationId: reservation_id,
        status: "cancelled",
      };
      changeReservationStatus(reservationStatus)
        .then(refreshHandler(true))
        .catch(setError);
    }
  };

  return (
    <Wrapper>
      {error && <ErrorAlert error={{ message: error }} />}
      <div className="info">
        <div className="text-group">
          <p className="label">Name: </p>
          <p>{first_name}</p> <p>{last_name}</p>
        </div>
        <div className="text-group">
          <p className="label">Phone: </p>
          <p>{mobile_number}</p>
        </div>
        <div className="text-group ">
          <p className="label">Status: </p>
          <p data-reservation-id-status={reservation_id}>{status}</p>
        </div>

        <div className="text-group">
          <p className="label">Date: </p>
          <p>{formatDate(reservation_date)}</p>
        </div>
        <div className="text-group">
          <p className="label">Time: </p>
          <p>{formatTime(reservation_time)}</p>
        </div>

        <div className="text-group">
          <p className="label">Number of people: </p>
          <p>{people}</p>
        </div>
      </div>
      <div className="reservation-btn-group">
        {status === "booked" && (
          <>
            <a href={`/reservations/${reservation_id}/seat`}>
              <div
                className="btn"
                href={`/reservations/${reservation_id}/seat`}
              >
                Seat
              </div>
            </a>
            <a href={`/reservations/${reservation_id}/edit`}>
              <div className="btn">Edit</div>
            </a>

            <div
              className="btn"
              data-reservation-id-cancel={reservation_id}
              onClick={() => cancelReservationHandler()}
            >
              Cancel
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default ReservationCard;
