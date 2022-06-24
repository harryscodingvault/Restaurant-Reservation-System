const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// CONTROLLERS
const service = require("./table.service");

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
  res
    .status(404)
    .json({ message: checkDate(reservation_date, reservation_time) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasProperties("name", "capacity")),
    asyncErrorBoundary(create),
  ],
};
