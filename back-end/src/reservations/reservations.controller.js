const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// UTILS

const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.params;
  const reservation = await service.getReservation({ reservation_id });

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  next({
    status: 400,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
};

const checkDate = (date, time) => {
  const inputDate = new Date(`${date} ${time}`);

  const currentDate = new Date();

  let formatTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  if (time < "10:30:00" || time > "21:30:00") {
    return "It has to be during open hours";
  }

  if (inputDate.getDay() === 2) {
    return "closed on Tuesday";
  }

  if (
    inputDate.toDateString() === currentDate.toDateString() &&
    formatTime > time
  ) {
    return "It has to be future time";
  }

  if (currentDate > inputDate) {
    return "It has to be a future date";
  }
  return true;
};

const isDate = (date) => {
  return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};

const isTime = (time) => {
  regexp_1 = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;
  regexp_2 = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;

  if (regexp_1.test(time) || regexp_2.test(time)) {
    return true;
  } else {
    return false;
  }
};

// CONTROLLERS
const service = require("./reservation.service");

async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (mobile_number) {
    const data = await service.getReservation({ mobile_number });
    return res.json({
      data: data,
    });
  }

  const data = await service.list(date);
  return res.json({
    data: data,
  });
}

async function getReservation(req, res) {
  const reservation = res.locals.reservation;

  return res.status(200).json({
    data: reservation,
  });
}

async function create(req, res) {
  const data = req.body.data;

  const { reservation_date, reservation_time, status, people } = data;

  if (status && status !== "booked") {
    return res.status(400).json({ error: `status can not be ${status}` });
  }

  if (typeof people === "string") {
    return res.status(400).json({ error: `people ${people} is not a number ` });
  }
  if (!isDate(reservation_date)) {
    return res.status(400).json({ error: "reservation_date is not a date" });
  }
  if (!isTime(reservation_time)) {
    return res.status(400).json({ error: "reservation_time is not a time" });
  }

  if (checkDate(reservation_date, reservation_time) === true) {
    const reservation = await service.create(data);
    return res.status(201).json({
      data: reservation,
    });
  }
  return res
    .status(400)
    .json({ error: checkDate(reservation_date, reservation_time) });
}

async function updateStatus(req, res) {
  const { status } = req.body.data;
  const reservation = res.locals.reservation;
  const { reservation_id } = reservation;
  console.log(status);

  if (reservation.status === status) {
    return res.status(400).json({ message: "same status" });
  }

  if (reservation.status === "finished") {
    return res.status(400).json({ message: "status already finished" });
  }

  if (status === "unknown") {
    return res.status(400).json({ error: "status can not be unknown" });
  }

  if (reservation_id) {
    const data = await service.updateStatus({ reservation_id, status });
    return res.status(200).json({
      data: { status: status },
    });
  }
  return res.status(400).json({ message: "problems updating status" });
}

async function updateReservation(req, res) {
  const data = req.body.data;

  const reservation = res.locals.reservation;
  const { reservation_id, reservation_date } = reservation;

  if (!isDate(reservation_date)) {
    res.status(400).json({ error: "reservation_date is not a date" });
  }
  if (!isTime(reservation_time)) {
    return res.status(400).json({ error: "reservation_time is not a time" });
  }
  if (reservation_id) {
    const info = await service.updateReservation({ reservation_id, data });
    return res.json({
      data: info,
    });
  }
  res.status(400).json({ error: "problems updating status" });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(
      hasProperties(
        "first_name",
        "last_name",
        "mobile_number",
        "reservation_date",
        "reservation_time",
        "people"
      )
    ),
    asyncErrorBoundary(create),
  ],
  getReservation: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(getReservation),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(hasProperties("status")),
    asyncErrorBoundary(updateStatus),
  ],
  updateReservation: [
    asyncErrorBoundary(
      hasProperties(
        "first_name",
        "last_name",
        "mobile_number",
        "reservation_date",
        "reservation_time",
        "people"
      )
    ),
    asyncErrorBoundary(reservationExists),

    asyncErrorBoundary(updateReservation),
  ],
};
