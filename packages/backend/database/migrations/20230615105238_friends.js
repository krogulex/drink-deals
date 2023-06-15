/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('friends', function(table) {
        table.increments('id').notNullable();
        table.string('name').notNullable();
        table.integer('age').notNullable();
        table.string('email').notNullable();
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
