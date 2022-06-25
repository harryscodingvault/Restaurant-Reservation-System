import React, { useEffect, useState } from "react";

import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../layout/ReservationList";

import { useDispatch, useSelector } from "react-redux";
import { getAllReservations } from "../../features/reservation/reservationSlice";

function Dashboard() {
  const { reservation_list } = useSelector((store) => store.reservation);
  const [reservations, setReservations] = useState(
    reservation_list ? reservation_list : []
  );
  const [reservationsError, setReservationsError] = useState(null);
  const dispatch = useDispatch();

  console.log("reservations", reservations);

  useEffect(() => {
    loadDashboard();
  }, []);

  function loadDashboard() {
    const abortController = new AbortController();
    dispatch(getAllReservations());
    setReservationsError(null);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <ReservationList reservations={reservations} />
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
