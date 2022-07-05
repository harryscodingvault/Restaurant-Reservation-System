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

  next({ status: 404, message: `Table ${table_id} cannot be found.` });
};

const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.body.data;

  const reservation = await reservationsService.getReservation({
    reservation_id,
  });

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
  const { capacity, table_id } = table;
  const { reservation_id, people } = reservation;

  if (table.reservation_id !== null) {
    return res.status(200).json({ message: "table is already occupied" });
  }
  if (capacity >= people) {
    const data = await service.update({ table_id, reservation_id });
    return res.json({
      data: data,
    });
  }
  return res.status(400).json({ message: "reservation is over capacity" });
}

async function deleteTable(req, res) {
  const table = res.locals.table;

  const { table_id } = table;
  if (table.reservation_id === null) {
    return res.status(400).json({ message: "not occupied" });
  }
  if (table_id) {
    const data = await service.update({ table_id, reservation_id: null });
    return res.json({
      data: data,
    });
  }
  return res.status(200).json({ message: "Can not free this table" });
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
  deleteTable: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(deleteTable),
  ],
};
