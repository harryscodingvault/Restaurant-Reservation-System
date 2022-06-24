exports.up = function (knex) {
  return knex.schema.createTable("tables_reservations", (table) => {
    table.integer("table_id").unsigned().notNullable();
    table
      .foreign("table_id")
      .references("table_id")
      .inTable("tables")
      .onDelete("cascade");
    table.integer("reservation_id").unsigned().notNullable();
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("cascade");
    table.boolean("occupied");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables_reservations");
};
