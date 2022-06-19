import React, { useState } from "react";
import Wrapper from "./addReservation.style.js";

const initialValues = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
};

const AddReservation = () => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    console.log(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Add Reservation</h3>
        <div className="form-row">
          <input
            type="text"
            className="form-input"
            name="first_name"
            placeholder="First Name"
            value={values.first_name}
            onChange={handleChange}
          ></input>
        </div>
        <button className="btn btn-blok" type="submit">
          <h5>Submit</h5>
        </button>
      </form>
    </Wrapper>
  );
};

export default AddReservation;
