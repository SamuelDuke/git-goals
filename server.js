const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/main');

const mongooseSetup = require('./mongooseSetup');
const apiRouter = require('./apiRouter');

const app = express();
mongooseSetup();

// Setup middleware for all Express requests
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));

// Setup router
apiRouter(app);

let server = app.listen(config.port);
console.log('The server is listing at port ' + config.port + '.');