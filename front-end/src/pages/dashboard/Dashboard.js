import React, { useEffect, useState } from "react";
import Wrapper from "./Dashboard.style";

import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../layout/ReservationList";
import TableList from "../../layout/TableList";

import { useNavigate, useLocation } from "react-router-dom";

import { getReservations, getTables } from "../../utils/api";
import { today, previous, next } from "../../utils/date-time";

function Dashboard() {
  const [error, setError] = useState(null);
  const [tables, setTables] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  let date = new URLSearchParams(useLocation().search).get("date");
  if (date === "undefined") {
    date = today();
  }
  const [currentDate, setCurrentDate] = useState(date || today());

  useEffect(() => {
    const loadDashboard = () => {
      let isMounted = true;
      const abortController = new AbortController();
      setError(null);

      getReservations({ date: currentDate })
        .then((res) => {
          if (isMounted) {
            setReservations(
              res.data?.filter(
                (reservation) => reservation.status !== "finished"
              )
            );
          }
        })
        .catch(setError);

      getTables()
        .then((res) => {
          if (isMounted) {
            setTables(res.data);
          }
        })
        .catch(setError);

      return () => abortController.abort();
    };
    loadDashboard();
    setRefresh(false);
  }, [currentDate, refresh]);

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

  const refreshHandler = (state) => {
    if (state === true) {
      setRefresh(true);
    }
  };

  return (
    <Wrapper>
      <div className="dashboard-current-date">
        <h2>{currentDate}</h2>
      </div>
      <div className="dashboard-button-group">
        <div className="btn" onClick={() => setCurrentDate(today())}>
          Today
        </div>
        <div className="btn" onClick={() => getPrev()}>
          Prev
        </div>
        <div className="btn" onClick={() => getNext()}>
          Next
        </div>
      </div>
      {tables?.length === 0 && <h2>No tables</h2>}
      <TableList
        tables={tables?.length > 0 ? tables : []}
        refreshHandler={(state) => refreshHandler(state)}
      />
      {reservations?.length === 0 && <h2>No Reservations</h2>}
      <ReservationList
        reservations={reservations?.length > 0 ? reservations : []}
        refreshHandler={(state) => refreshHandler(state)}
      />

      <ErrorAlert error={error} />
    </Wrapper>
  );
}

export default Dashboard;
