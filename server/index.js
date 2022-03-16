const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv/config');
const app = express();

// bodyparser
app.use(bodyparser.json());

// cors
app.use(cors());

/* start database connection*/
const db = require('./dbconnection');

db.connect((err) => {
  err
    ? console.err('Database Connection Failed')
    : console.err('Database Connection Successful');
});
/* end database connection*/

// router paths
const routes = require('./router/router');
app.use('/api', routes);

/*start server*/
app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server Running....');
});
/*end server*/
