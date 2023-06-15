/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('friends').del()
  await knex('friends').insert([
    { name: 'Jorwerehn', age: 25, email: 'john@example.com' },
    { name: 'Alrewerice', age: 28, email: 'alice@example.com' },
    { name: 'Berwrewob', age: 32, email: 'bob@example.com' },
    { name: 'Joreerwhn', age: 25, email: 'john@example.com' },
    { name: 'Alerwerwice', age: 28, email: 'alice@example.com' },
    { name: 'Boerwewrb', age: 32, email: 'bob@example.com' }
  ]);
};
