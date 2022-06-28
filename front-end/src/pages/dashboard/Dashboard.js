import React, { useEffect, useState } from "react";
import Wrapper from "./Dashboard.style";

import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../layout/ReservationList";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllReservations,
  setSearchDate,
} from "../../features/reservation/reservationSlice";
import { today, previous, next } from "../../utils/date-time";

function Dashboard() {
  const { reservation_list, search_date } = useSelector(
    (store) => store.reservation
  );
  const [reservationsError, setReservationsError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadDashboard = (date) => {
      const abortController = new AbortController();
      dispatch(getAllReservations(date));
      setReservationsError(null);

      return () => abortController.abort();
    };

    loadDashboard(search_date || today());
  }, [search_date, dispatch]);

  const getPrev = () => {
    let prevDate = previous(search_date || today());
    dispatch(setSearchDate(prevDate));
  };

  const getNext = () => {
    let nextDate = next(search_date || today());
    dispatch(setSearchDate(nextDate));
  };

  return (
    <Wrapper>
      <div className="dashboard-current-date">
        <h2>{search_date || today()}</h2>
      </div>
      <div className="dashboard-button-group">
        <div className="btn" onClick={() => dispatch(setSearchDate(today()))}>
          Today
        </div>
        <div className="btn" onClick={() => getPrev()}>
          Prev
        </div>
        <div className="btn" onClick={() => getNext()}>
          Next
        </div>
      </div>
      <h1>Dashboard</h1>
      <ReservationList
        reservations={reservation_list ? reservation_list : []}
      />
      <ErrorAlert error={reservationsError} />
    </Wrapper>
  );
}

export default Dashboard;
