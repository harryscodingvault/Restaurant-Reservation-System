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
  const { names, capacity } = data;

  if (capacity >= 1) {
    const reservation = await service.create(data);
    return res.json({
      data: reservation,
    });
  }
  res.status(400).json({ message: "capacity has to be al least 1" });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasProperties("name", "capacity")),
    asyncErrorBoundary(create),
  ],
};
