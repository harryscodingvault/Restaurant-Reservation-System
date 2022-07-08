import React, { useEffect, useState } from "react";
import Wrapper from "./Dashboard.style";

import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../layout/ReservationList";
import TableList from "../../layout/TableList";

import { useNavigate, useLocation } from "react-router-dom";

import { getAllReservations } from "../../utils/api";
import { today, previous, next } from "../../utils/date-time";

function Dashboard() {
  const [error, setError] = useState(null);
  const [showTables, setShowTables] = useState(false);
  const [reservations, setReservations] = useState(null);
  const navigate = useNavigate();
  const date = new URLSearchParams(useLocation().search).get("date");
  const [currentDate, setCurrentDate] = useState(date || today());

  const loadDashboard = () => {
    const abortController = new AbortController();
    setError(null);

    getAllReservations(currentDate)
      .then((res) => setReservations(res.data))
      .catch(setError);

    console.log(reservations);

    const filteredReservations = reservations?.filter(
      (reservation) => reservation.status !== "finished"
    );
    setReservations(filteredReservations);
    return () => abortController.abort();
  };

  useEffect(loadDashboard, [currentDate]);

  const getPrev = () => {
    let prevDate = previous(currentDate || today());
    setCurrentDate(prevDate);
    navigate(`/dashboard?date=${prevDate}`);
  };

  const getNext = () => {
    let nextDate = next(currentDate || today());
    setCurrentDate(nextDate);
    navigate(`/dashboard?date=${nextDate}`);
  };

  return (
    <Wrapper>
      <div className="dashboard-switch">
        <div className="btn" onClick={() => setShowTables(!showTables)}>
          {showTables ? <h5>Reservations</h5> : <h5>Tables</h5>}
        </div>
      </div>
      {!showTables && (
        <>
          <div className="dashboard-current-date">
            <h2>{currentDate}</h2>
          </div>
          <div className="dashboard-button-group">
            <div className="btn">Today</div>
            <div className="btn" onClick={() => getPrev()}>
              Prev
            </div>
            <div className="btn" onClick={() => getNext()}>
              Next
            </div>
          </div>

          <ReservationList
            reservations={reservations?.length > 0 ? reservations : []}
          />
          <ErrorAlert error={error} />
        </>
      )}
    </Wrapper>
  );
}

export default Dashboard;
