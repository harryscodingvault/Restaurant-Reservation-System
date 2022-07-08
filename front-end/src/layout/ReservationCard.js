import React, { useState, useEffect } from "react";
import Wrapper from "./ReservationCard.style";

import { Link } from "react-router-dom";

const ReservationCard = ({ reservation }) => {
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
    }
  };

  return (
    <Wrapper>
      <div className="info">
        <div className="text-group">
          <p className="label">Name: </p>
          <p>{first_name}</p> <p>{last_name}</p>
        </div>
        <div className="text-group">
          <p className="label">Phone: </p>
          <p>{mobile_number}</p>
        </div>
        <div className="text-group">
          <p
            className={`label data-reservation-id-status=${reservation.reservation_id}`}
          >
            Status:{" "}
          </p>
          <p>{status}</p>
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
            <Link to={`/reservations/${reservation_id}/seat`}>
              <div className="btn">
                <h5>Seat</h5>
              </div>
            </Link>
            <Link to={`/reservations/${reservation_id}/edit`}>
              <div className="btn">
                <h5>Edit</h5>
              </div>
            </Link>

            <div
              className={`btn data-reservation-id-cancel=${reservation_id}`}
              onClick={() => cancelReservationHandler()}
            >
              <h5>Cancel</h5>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default ReservationCard;
