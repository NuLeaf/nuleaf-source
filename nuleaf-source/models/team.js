/**
 * Team Model. Defines the Schema of teams using Mongoose ODM.
 */

/* jslint node: true */
'use strict';

var mongoose = require('mongoose');

// Schema definition for teams.
var teamSchema = new mongoose.Schema({
  name : { type: String, maxlength: 128, required: true, unique: true }
});

// Exports the Event model.
module.exports = mongoose.model('Team', teamSchema);