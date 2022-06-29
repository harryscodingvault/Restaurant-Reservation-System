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

  next({ status: 400, message: `Reservation cannot be found.` });
};

const checkDate = (date, time) => {
  const inputDate = new Date(`${date} ${time}`);

  const currentDate = new Date();

  let formatTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  if (time < "10:30:00" || time > "21:30:00") {
    return "It has to be during open hours";
  }

  if (inputDate.getDay() === 2) {
    return "Closed on Tuesday";
  }
  if (
    inputDate.toDateString() === currentDate.toDateString() &&
    formatTime > time
  ) {
    return "It has to be current time";
  }
  if (currentDate > inputDate) {
    return "It has to be a future date";
  }
  return true;
};

// CONTROLLERS
const service = require("./reservation.service");

async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (mobile_number) {
    try {
      const data = await service.getReservation({ mobile_number });
      return res.json({
        data: data,
      });
    } catch (err) {
      res.status(400).json({ message: "No reservations found" });
    }
  }

  const data = await service.list(date);
  return res.json({
    data: data,
  });
}

async function getReservation(req, res) {
  const reservation = res.locals.reservation;

  res.json({
    data: reservation,
  });
}

async function create(req, res) {
  const data = req.body.data;

  const { reservation_date, reservation_time } = data;

  if (checkDate(reservation_date, reservation_time) === true) {
    const reservation = await service.create(data);
    return res.json({
      data: reservation,
    });
  }
  res
    .status(400)
    .json({ message: checkDate(reservation_date, reservation_time) });
}

async function updateStatus(req, res) {
  const { status } = req.body.data;
  const reservation = res.locals.reservation;
  const { reservation_id } = reservation;
  console.log(status);

  if (reservation_id) {
    const data = await service.updateStatus({ reservation_id, status });
    return res.json({
      data: data,
    });
  }
  res.status(400).json({ message: "problems updating status" });
}

async function updateReservation(req, res) {
  const data = req.body.data;

  const reservation = res.locals.reservation;
  const { reservation_id } = reservation;

  if (reservation_id) {
    const info = await service.updateReservation({ reservation_id, data });
    return res.json({
      data: info,
    });
  }
  res.status(400).json({ message: "problems updating status" });
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
    asyncErrorBoundary(reservationExists),
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
    asyncErrorBoundary(updateReservation),
  ],
};
