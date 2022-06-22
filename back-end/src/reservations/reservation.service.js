const knex = require("../db/connection.js");

const list = () => {
  return knex("reservations").select("*");
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
