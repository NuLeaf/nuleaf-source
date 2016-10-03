/**
 * User Model. Defines the Schema of users using Mongoose ODM.
 */

/* jslint node: true */
'use strict';

var mongoose = require('mongoose');

// Schema definition for teams.
var userSchema = new mongoose.Schema({
  username   : { type: String, maxlength: 128, required: true, unique: true },
  email      : { type: String, maxlength: 128, required: true, unique: true },
  password   : { type: String, maxlength: 128, required: true },
  firstname  : { type: String, maxlength: 64 },
  lastname   : { type: String, maxlength: 64 },
  image1     : { type: String, maxlength: 256, default: '' },
  image2     : { type: String, maxlength: 256, default: '' },
  is_active  : { type: Boolean, default: true },
  team_name  : { type: String, maxlength: 128, required: true },
  description: { type: String, maxlength: 1000, default: '' }
});

// Exports the User model.
module.exports = mongoose.model('User', userSchema);