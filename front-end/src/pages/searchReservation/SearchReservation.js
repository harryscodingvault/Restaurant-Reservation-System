import React, { useEffect, useState } from "react";
import Wrapper from "./SearchReservation.style";

import FormRow from "../../layout/FormRow.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ErrorAlert from "../../layout/ErrorAlert.js";
import {
  getAllReservations,
  setSearchPhone,
} from "../../features/reservation/reservationSlice";
import ReservationList from "../../layout/ReservationList";

const initialValues = {
  mobile_number: "",
};

const SearchReservation = () => {
  const { api_error, isLoading, search_phone, reservation_list } = useSelector(
    (store) => store.reservation
  );
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(api_error);
  const [reservations, setReservations] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(reservations);

  useEffect(() => {
    setError(api_error);

    if (reservations?.length <= 0 && search_phone) {
      setError("No reservations found ");
    }
  }, [api_error, reservations, search_phone]);

  useEffect(() => {
    setReservations(reservation_list);
  }, [reservation_list, search_phone]);

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "mobile_number") {
      const phoneNumber = formatPhoneNumber(value);
      setValues({ ...values, mobile_number: phoneNumber });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { mobile_number } = values;

    console.log("search_phone", mobile_number);
    if (!mobile_number) {
      setError("Fill all required fields!");
    } else {
      dispatch(getAllReservations({ search_phone: mobile_number }));
      dispatch(setSearchPhone(mobile_number));
      setReservationsError(null);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Search By Phone</h3>
        {error && <ErrorAlert error={{ message: error }} />}
        <FormRow
          type="tel"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          value={values.mobile_number}
          handleChange={handleChange}
        ></FormRow>

        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <button className="btn btn-blok" type="submit">
            <h5>Find</h5>
          </button>
        )}
        <button
          className="btn btn-blok"
          type="button"
          onClick={() => navigate("/")}
        >
          <h5>Cancel</h5>
        </button>
      </form>
      <ReservationList reservations={reservations ? reservations : []} />
      <ErrorAlert error={reservationsError} />
    </Wrapper>
  );
};

export default SearchReservation;
