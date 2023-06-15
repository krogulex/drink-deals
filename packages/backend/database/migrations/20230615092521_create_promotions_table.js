/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('promotions', table => {
        table.charset('utf8mb4');
        table.increments('_id').primary();
        table.string('name').notNullable();
        table.string('place').notNullable();
        table.timestamps(false, true)
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('promotions');
};
