import React, { useState, useEffect } from "react";
import Wrapper from "./editReservation.style";

import FormRow from "../../layout/FormRow.js";
import { useNavigate, useParams } from "react-router-dom";

import { formatAsDate } from "../../utils/date-time";
import ErrorAlert from "../../layout/ErrorAlert.js";

const EditReservation = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const { reservationId } = useParams();

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
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    } = values;

    if (
      !first_name ||
      !last_name ||
      !mobile_number ||
      !reservation_date ||
      !reservation_time ||
      !people
    ) {
      setError("Fill all required fields!");
    } else {
      setSubmit(true);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Edit Reservation</h3>
        {error && <ErrorAlert error={{ message: error }} />}
        <FormRow
          type="text"
          name="first_name"
          placeholder="First Name"
          value={values.first_name}
          handleChange={handleChange}
        ></FormRow>
        <FormRow
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={values.last_name}
          handleChange={handleChange}
        ></FormRow>

        <FormRow
          type="tel"
          name="mobile_number"
          placeholder="Mobile Number"
          value={values.mobile_number}
          handleChange={handleChange}
        ></FormRow>

        <FormRow
          type="date"
          name="reservation_date"
          placeholder="Reservation Date"
          value={values.reservation_date}
          handleChange={handleChange}
        ></FormRow>
        <FormRow
          type="time"
          name="reservation_time"
          placeholder="Reservation Time"
          value={values.reservation_time}
          handleChange={handleChange}
          min="22:30"
          max="21:30"
        ></FormRow>
        <FormRow
          type="number"
          name="people"
          placeholder="Number of People"
          value={values.people}
          handleChange={handleChange}
          min="1"
        ></FormRow>

        <div className="spinner"></div>

        <button className="btn" type="submit">
          <h5>Submit</h5>
        </button>

        <button
          className="btn"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          <h5>Cancel</h5>
        </button>
      </form>
    </Wrapper>
  );
};

export default EditReservation;
