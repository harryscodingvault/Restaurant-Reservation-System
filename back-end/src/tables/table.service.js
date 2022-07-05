const knex = require("../db/connection.js");

const list = () => {
  return knex("tables").select("*").orderBy("table_name", "asc");
};

const getTable = (table_id) => {
  return knex("tables").select("*").where({ table_id: table_id }).first();
};

const create = (data) => {
  return knex("tables")
    .insert(data, "*")
    .then((createdRecords) => createdRecords[0]);
};

const update = ({ table_id, reservation_id }) => {
  return knex("tables").select("*").where({ table_id: table_id }).update(
    {
      reservation_id: reservation_id,
    },
    "*"
  );
};

module.exports = {
  list,
  create,
  getTable,
  update,
};
