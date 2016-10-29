/**
 * Main file serving the REST API.
 *
 * Initialize express app, register routes, connect to db, and start listening for requests.
 */

/* jslint node: true */
'use strict';

var bodyParser = require('body-parser');
var express    = require('express');
var mongoose   = require('mongoose');

var config = require('./config');
var routes = require('./routes');


// Connect to the MongoDB.
mongoose.connect(config.dbURL);

// Get express application.
var restAPI = express();

// Use body-parser to parse request data. All request data should be in the querystring or as json.
restAPI.use(bodyParser.json());

// Register routes declared in routes.js.
restAPI.use(routes);

// Start server.
var SERVER_PORT = 3000;
restAPI.listen(SERVER_PORT, function() {
  console.log('Nuleaf Source REST API listening on port ' + SERVER_PORT);
});

module.exports = restAPI;
