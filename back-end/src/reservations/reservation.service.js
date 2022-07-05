const knex = require("../db/connection.js");

const list = (date) => {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .andWhere("status", "!=", "finished")
      .orderBy("reservation_time", "asc");
  }
  return knex("reservations").select("*").orderBy("reservation_time", "asc");
};

const getReservation = ({ reservation_id, mobile_number }) => {
  if (mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
};

const create = (data) => {
  return knex("reservations")
    .insert(data, "*")
    .then((createdRecords) => createdRecords[0]);
};

const updateStatus = ({ reservation_id, status }) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .update(
      {
        status: status,
      },
      "*"
    );
};

const updateReservation = ({ reservation_id, data }) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .update(data, "*");
};

module.exports = {
  list,
  create,
  getReservation,
  updateStatus,
  updateReservation,
};
