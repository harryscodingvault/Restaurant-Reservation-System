import React, { useEffect, useState } from "react";
import Wrapper from "./Dashboard.style";

import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../layout/ReservationList";
import TableList from "../../layout/TableList";

import { useNavigate } from "react-router-dom";

import { today, previous, next } from "../../utils/date-time";

function Dashboard() {
  const [reservationsError, setReservationsError] = useState(null);
  const [showTables, setShowTables] = useState(false);
  const [reservations, setReservations] = useState(null);

  const navigate = useNavigate();

  const getPrev = () => {
    // let prevDate = previous(search_date || today());
    // navigate(`/dashboard?date=${prevDate}`);
  };

  const getNext = () => {
    //let nextDate = next(search_date || today());
    //navigate(`/dashboard?date=${nextDate}`);
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
            <h2>{today()}</h2>
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

          <ReservationList reservations={reservations ? reservations : []} />
          <ErrorAlert error={reservationsError} />
        </>
      )}
    </Wrapper>
  );
}

export default Dashboard;
