const knex = require("../db/connection.js");

const list = (date) => {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_date", "asc");
  }
  return knex("reservations").select("*").orderBy("reservation_date", "asc");
};

const create = (data) => {
  return knex("reservations")
    .insert(data, "*")
    .then((createdRecords) => createdRecords[0]);
};

module.exports = {
  list,
  create,
};
