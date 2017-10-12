const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);


knex('students').then((results) => {
  console.log(results[5]);

  knex.destroy();
})
.catch((err) => {
  console.error(err);
  knex.destroy();
  process.exit(1);
});
