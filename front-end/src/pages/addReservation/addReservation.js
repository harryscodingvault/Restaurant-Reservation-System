import React, { useState } from "react";
import Wrapper from "./addReservation.style.js";
import FormRow from "../../layout/FormRow.js";

import { today } from "../../utils/date-time.js";

const initialValues = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: today(),
  reservation_time: "",
  people: 1,
};

const AddReservation = () => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Add Reservation</h3>
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
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
        <button className="btn btn-blok" type="submit">
          <h5>Submit</h5>
        </button>
      </form>
    </Wrapper>
  );
};

export default AddReservation;
