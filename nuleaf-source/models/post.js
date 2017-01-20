/**
 * Post Model. Defines the Schema of posts using Mongoose ODM.
 */

/* jslint node: true */
'use strict';

var mongoose = require('mongoose');

// Schema definition for blogs.
var postSchema = new mongoose.Schema({
  title          :  { type: String, maxlength: 128, required: true },
  content        :  { type: String, required: true },
  author         :  { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date_created   :  Date,
  date_published :  Date,
  date_modified  :  Date
})

// Exports the Post model.
module.exports = mongoose.model('Posts', postSchema);