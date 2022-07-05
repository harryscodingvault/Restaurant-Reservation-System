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
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: "data is missing" });
  }
  const { reservation_id } = data;

  if (!reservation_id) {
    return res.status(400).json({ error: `reservation_id  is missing` });
  }

  const reservation = await reservationsService.getReservation({
    reservation_id,
  });

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
};

// CONTROLLERS

async function list(req, res) {
  const data = await service.list();
  return res.status(200).json({
    data: data,
  });
}

async function create(req, res) {
  const data = req.body.data;
  const { table_name, capacity } = data;

  if (table_name.length === 1) {
    return res.status(400).json({ error: `table_name cant be ${table_name}` });
  }
  if (typeof capacity === "string") {
    return res
      .status(400)
      .json({ error: `capacity ${capacity} has to be a number` });
  }

  if (capacity >= 1) {
    const reservation = await service.create(data);
    return res.status(201).json({
      data: reservation,
    });
  }
  return res.status(400).json({ message: "capacity has to be al least 1" });
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
    const status = await reservationsService.updateStatus({
      reservation_id,
      status: "seated",
    });
    return res.status(200).json({
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
    const status = await reservationsService.updateStatus({
      reservation_id: table.reservation_id,
      status: "finished",
    });
    return res.json({
      data: data,
    });
  }
  return res.status(200).json({ message: "Can not free this table" });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasProperties("table_name", "capacity")),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(update),
  ],
  deleteTable: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(deleteTable),
  ],
};
