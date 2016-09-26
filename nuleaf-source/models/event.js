/**
 * Event Model. Defines the Schema of events using Mongoose ODM.
 */

/* jslint node: true */
'use strict';

var mongoose = require('mongoose');


// Schema definition for events.
var eventSchema = new mongoose.Schema({
  title   : { type: String, maxlength: 128, required: true },
  date    : Date,
  location: { type: String, maxlength: 128 }
});

// Exports the Event model.
module.exports = mongoose.model('Event', eventSchema);