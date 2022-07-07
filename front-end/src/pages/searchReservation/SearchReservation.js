import React, { useEffect, useState } from "react";
import Wrapper from "./SearchReservation.style";

import FormRow from "../../layout/FormRow.js";
import { useNavigate } from "react-router-dom";

import ErrorAlert from "../../layout/ErrorAlert.js";

import ReservationList from "../../layout/ReservationList";

const initialValues = {
  mobile_number: "",
};

const SearchReservation = () => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);

  const navigate = useNavigate();

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

        <div className="spinner"></div>

        <button className="btn btn-blok" type="submit">
          <h5>Find</h5>
        </button>

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
