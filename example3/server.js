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

// Get all students
app.get('/students', function(req, res) {
  knex('students').then((result) => {
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
app.get('/student/:id', function(req, res) {

  knex('students')
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
app.post('/student', function(req, res) {

  knex('students')
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
app.put('/student/:id', function(req, res) {
  knex('students')
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
app.delete('/student/:id', function(req, res) {
  knex('students')
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
