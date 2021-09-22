'use strict';

const express = require('express');
const knex = require('./knex');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.send('Hello from your API!!!');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
