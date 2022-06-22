/**
 * List handler for reservation resources
 */
const service = require("./reservation.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  res.json({
    data: data,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
