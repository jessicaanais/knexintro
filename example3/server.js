const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));

// CRUD
// create read update delete (destroy)

// Get all users
app.get('/users', function(req, res) {
  knex('users').then((result) => {
    console.log(result);
    knex.destroy();
    res.json(result)
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
  });
});

// Get one user
app.get('/users/:id', function(req, res) {

  knex('users')
    .where('id', req.params.id)
    .limit(1)
    .then((result)=>{
      console.log(result);
      res.json(result[0]);
    })
    .catch((err)=>{
      console.error(err);
      knex.destroy();
    })

});

// Create new user
app.post('/users', function(req, res) {

  knex('users')
    .insert(req.body, '*')
    .then((result) => {
      console.log(result);
      knex.destroy();
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      knex.destroy();
      res.sendStatus(400);
    });
});

// Update one user
app.put('/users/:id', function(req, res) {
  knex('users')
    .update(req.body)
    .where('id', req.params.id)
    .then((result) => {
      console.log(result);
      knex.destroy();
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      knex.destroy();
      res.sendStatus(400);
    });
});

// Delete one user
app.delete('/users/:id', function(req, res) {
  knex('users')
    .del()
    .where('id', req.params.id)
    .then((result) => {
      console.log(result);
      knex.destroy();
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      knex.destroy();
      res.sendStatus(400);
    });
});

app.listen(port, function() {
  console.log('Listening on', port);
});
