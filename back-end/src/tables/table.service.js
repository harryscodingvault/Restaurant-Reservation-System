const knex = require("../db/connection.js");

const list = () => {
  return knex("tables").select("*").orderBy("capacity", "desc");
};

const getTable = (table_id) => {
  return knex("tables").select("*").where({ table_id: table_id }).first();
};

const create = (data) => {
  return knex("tables")
    .insert(data, "*")
    .then((createdRecords) => createdRecords[0]);
};

module.exports = {
  list,
  create,
  getTable,
};
