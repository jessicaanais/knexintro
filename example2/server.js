const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);


knex('students').then((result) => {
  console.log(result);
  knex.destroy();
})
.catch((err) => {
  console.error(err);
  knex.destroy();
  process.exit(1);
});
