import React, { useState, useEffect } from "react";
import Wrapper from "./AddReservation.style";
import FormRow from "../../layout/FormRow.js";
import { useNavigate } from "react-router-dom";

import { today } from "../../utils/date-time.js";
import ErrorAlert from "../../layout/ErrorAlert.js";
import { addReservation } from "../../utils/api";

const newDate = new Date();
let currentTime = newDate
  .toLocaleTimeString("en-US", { hour12: false })
  .split("");
currentTime.splice(5, 3);
currentTime = currentTime.join("");

const initialValues = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: today(),
  reservation_time: currentTime,
  people: 1,
};

const AddReservation = () => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!error && reservation) {
      navigate(`/dashboard?date=${values.reservation_date}`);
      setReservation(null);
    }
  }, [navigate, error, reservation, values]);

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
      setError(null);
      addReservation({ ...values, people: Number(people) })
        .then(setReservation)
        .catch(setError);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Add Reservation</h3>
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
        ></FormRow>
        <FormRow
          type="number"
          name="people"
          placeholder="Number of People"
          value={values.people}
          handleChange={handleChange}
          min="1"
        ></FormRow>

        <button className="btn btn-block" type="submit">
          Submit
        </button>

        <button
          className="btn btn-block"
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </Wrapper>
  );
};

export default AddReservation;
