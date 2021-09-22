'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('cities', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.string('state').notNullable().defaultTo('');
    table.integer('population').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities');
};
