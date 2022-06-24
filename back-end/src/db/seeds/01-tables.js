exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tables").del();
  await knex("tables").insert([
    {
      name: "Bar #1",
      capacity: 1,
    },
    {
      name: "Bar #2",
      capacity: 1,
    },
    {
      name: "#1",
      capacity: 6,
    },
    {
      name: "#2",
      capacity: 6,
    },
  ]);
};
