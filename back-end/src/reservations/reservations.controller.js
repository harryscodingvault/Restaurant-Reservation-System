const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// CONTROLLERS
const service = require("./reservation.service");

async function list(req, res) {
  const { date } = req.query;
  console.log(date);
  const data = await service.list(date);
  res.json({
    data: data,
  });
}

async function create(req, res) {
  const data = req.body.data;
  const reservation = await service.create(data);
  return res.json({
    data: reservation,
  });
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
