/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('friends', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('age');
        table.string('email');
        table.timestamps(false, true);
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('friends');
};
