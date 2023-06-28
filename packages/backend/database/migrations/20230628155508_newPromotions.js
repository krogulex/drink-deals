/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('newPromotions', table => {
        table.charset('utf8mb4');
        table.increments('_id').primary();
        table.string('name').notNullable();
        table.string('place').notNullable();
        table.string('price').notNullable()
        table.boolean('allDay')
        table.boolean('allWeek')
        table.string('startHours')
        table.string('endHours')
        table.string('description')
        table.string('category')
        table.string('day')
        table.string('link')
        table.string('image')
        table.timestamps(false, true)
      });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('newPromotions');
};
