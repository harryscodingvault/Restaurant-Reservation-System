const knex = require("../db/connection.js");

const list = () => {
  return knex("tables").select("*").orderBy("capacity", "asc");
};

const create = (data) => {
  return knex("tables")
    .insert(data, "*")
    .then((createdRecords) => createdRecords[0]);
};

module.exports = {
  list,
  create,
};
