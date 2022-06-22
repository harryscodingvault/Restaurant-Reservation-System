const knex = require("../db/connection.js");

const list = () => {
  return knex("reservations").select("*");
};

module.exports = {
  list,
};
