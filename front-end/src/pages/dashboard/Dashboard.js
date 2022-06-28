import React, { useEffect, useState } from "react";

import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../layout/ReservationList";

import { useDispatch, useSelector } from "react-redux";
import { getAllReservations } from "../../features/reservation/reservationSlice";
import { today } from "../../utils/date-time";

const initialState = {
  currentDate: today(),
};

function Dashboard() {
  const { reservation_list, search_date } = useSelector(
    (store) => store.reservation
  );
  const [reservationsError, setReservationsError] = useState(null);
  const [searchByDate, setSearchByDate] = useState(
    search_date ? search_date : initialState.currentDate
  );
  const [searchByPhone, setSearchByPhone] = useState(null);
  const dispatch = useDispatch();

  console.log("search_date", search_date);

  useEffect(() => {
    loadDashboard(searchByDate);
  }, []);

  const loadDashboard = (date) => {
    const abortController = new AbortController();
    dispatch(getAllReservations(date));
    setReservationsError(null);

    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <ReservationList
        reservations={reservation_list ? reservation_list : []}
      />
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
