const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// UTILS
const checkDate = (date, time) => {
  const inputDate = new Date(date);
  const inputTime = new Date(time);

  const currentDate = new Date();

  const currentTime = currentDate.getTime();

  console.log(inputDate, inputTime, inputDate >= currentDate);

  return false;
};

// CONTROLLERS
const service = require("./reservation.service");

async function list(req, res) {
  const { date } = req.query;

  const data = await service.list(date);
  res.json({
    data: data,
  });
}

async function create(req, res) {
  const data = req.body.data;
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = data;

  if (checkDate(reservation_date, reservation_time) === true) {
    const reservation = await service.create(data);
    return res.json({
      data: reservation,
    });
  }
  res.status(404).json({ message: `It has to be a future date` });
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
};
