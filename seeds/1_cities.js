'use strict';

exports.seed = function(knex) {
  return knex('cities').del()
    .then(() => {
      return knex('cities').insert([
        {
          name: 'Seattle',
          state: 'Washington',
          population: 704352
        },
        {
          name: 'Philipsburg',
          state: 'Montana',
          population: 850
        },
        {
          name: 'Clemson',
          state: 'South Carolina',
          population: 16058
        },
        {
          name: 'North Brunswick',
          state: 'New Jersey',
          population: 36287
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities));");
    });
};
