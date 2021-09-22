'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/heroku_hello_world_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/heroku_hello_world_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
