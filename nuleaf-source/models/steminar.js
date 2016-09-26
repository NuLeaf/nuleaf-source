/**
 * Steminar Model. Defines the Schema of steminars using Mongoose ODM.
 */

 /* jslint node: true */
'use strict';

var mongoose = require('mongoose');


// Schema definition for events.
var steminarSchema = new mongoose.Schema({
  title      : { type: String, maxlength: 128, required: true },
  date       : Date,
  location   : { type: String, maxlength: 128 },
  host       : { type: String, maxlength: 128 },
  imageFile  : { type: String, maxlength: 256 },
  description: String
});

// Exports the Steminar model.
module.exports = mongoose.model('Steminar', steminarSchema);