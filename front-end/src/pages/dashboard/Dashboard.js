import React, { useEffect, useState } from "react";

import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../layout/ReservationList";

import { useDispatch, useSelector } from "react-redux";
import { getAllReservations } from "../../features/reservation/reservationSlice";

function Dashboard() {
  const { reservation_list } = useSelector((store) => store.reservation);
  const [reservationsError, setReservationsError] = useState(null);
  const [searchByDate, setSearchByDate] = useState(null);
  const [searchByPhone, setSearchByPhone] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadDashboard = () => {
      const abortController = new AbortController();
      dispatch(getAllReservations());
      setReservationsError(null);

      return () => abortController.abort();
    };

    loadDashboard();
  }, []);

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
