const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// CONTROLLERS
const service = require("./table.service");

async function list(req, res) {
  const data = await service.list();
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
    asyncErrorBoundary(hasProperties("name", "capacity")),
    asyncErrorBoundary(create),
  ],
};
