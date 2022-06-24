const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./table.service");
const reservationsService = require("../reservations/reservation.service");

// UTILS

const tableExists = async (req, res, next) => {
  const { table_id } = req.params;
  const table = await service.getTable(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }

  next({ status: 400, message: `Table cannot be found.` });
};

const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsService.getReservation(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  next({ status: 400, message: `Reservation cannot be found.` });
};

// CONTROLLERS

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

async function update(req, res) {
  const table = res.locals.table;
  const reservation = res.locals.reservation;

  console.log(table, reservation);

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
  update: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(hasProperties("reservation_id")),
    asyncErrorBoundary(update),
  ],
};
