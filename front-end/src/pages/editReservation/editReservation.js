import React, { useState, useEffect } from "react";
import Wrapper from "./editReservation.style";

import FormRow from "../../layout/FormRow.js";
import { useNavigate, useParams } from "react-router-dom";

import { formatAsDate } from "../../utils/date-time";
import ErrorAlert from "../../layout/ErrorAlert.js";
import { editReservation, getReservation } from "../../utils/api";

const EditReservation = () => {
  const [reservation, setReservation] = useState(null);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { reservationId } = useParams();

  useEffect(() => {
    if (!error && reservation) {
      navigate(-1);
      setReservation(null);
    }
  }, [navigate, error, reservation, values]);

  const loadReservation = () => {
    const abortController = new AbortController();
    setError(null);

    getReservation(reservationId)
      .then((res) => {
        setValues({
          ...res.data,
          reservation_date: formatAsDate(res.data.reservation_date),
        });
      })
      .catch(setError);

    return () => {
      abortController.abort();
    };
  };

  useEffect(loadReservation, [reservationId]);

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
      editReservation(values).then(setReservation).catch(setError);
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

        <button className="btn" type="submit">
          <h5>Submit</h5>
        </button>

        <button className="btn" type="button" onClick={() => navigate(-1)}>
          <h5>Cancel</h5>
        </button>
      </form>
    </Wrapper>
  );
};

export default EditReservation;
