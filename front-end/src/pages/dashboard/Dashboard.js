import React, { useEffect, useState } from "react";
import Wrapper from "./Dashboard.style";

import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../layout/ReservationList";
import TableList from "../../layout/TableList";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllReservations,
  setSearchDate,
  getTables,
} from "../../features/reservation/reservationSlice";
import { today, previous, next } from "../../utils/date-time";

function Dashboard() {
  const { reservation_list, search_date, table_list } = useSelector(
    (store) => store.reservation
  );
  const [reservationsError, setReservationsError] = useState(null);
  const [showTables, setShowTables] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadDashboard = (date) => {
      const abortController = new AbortController();
      dispatch(getAllReservations(date));
      dispatch(getTables());
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
      <div className="dashboard-switch">
        <div className="btn" onClick={() => setShowTables(!showTables)}>
          {showTables ? <h5>Reservations</h5> : <h5>Tables</h5>}
        </div>
      </div>
      {!showTables && (
        <>
          <div className="dashboard-current-date">
            <h2>{search_date || today()}</h2>
          </div>
          <div className="dashboard-button-group">
            <div
              className="btn"
              onClick={() => dispatch(setSearchDate(today()))}
            >
              Today
            </div>
            <div className="btn" onClick={() => getPrev()}>
              Prev
            </div>
            <div className="btn" onClick={() => getNext()}>
              Next
            </div>
          </div>

          <ReservationList
            reservations={reservation_list ? reservation_list : []}
          />
          <ErrorAlert error={reservationsError} />
        </>
      )}
      {showTables && (
        <>
          <div className="dashboard-current-date">
            <h2>{search_date || today()}</h2>
          </div>

          <TableList tables={table_list ? table_list : []} />
          <ErrorAlert error={reservationsError} />
        </>
      )}
    </Wrapper>
  );
}

export default Dashboard;
