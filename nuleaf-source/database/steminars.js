/**
 * Steminars database access object. Opinionated wrapper around mongoose.
 *
 * Handles requests to steminars collection.
 */

/* jslint node: true */
'use strict';

var Helper = require('../util/helper');

var Steminar = require('../models/steminar');


/**
 * Finds steminars matching conditions and returns a collection of steminars.
 * @param  {Object} Conditions:
 *                    title     : Filter for steminars with this title.
 *                    start_date: Filter for steminars after this date.
 *                    end_date  : Filter for steminars before this date.
 *                    location  : Filter for steminars with this location.
 *                    host      : Filter for steminars with this host.
 *                    
 * @return {Error}, {Array} Array of steminars, or empty if none found matching conditions.
 */
exports.find = function(conditions, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
  }

  var _conditions = buildConditions(conditions);
  Steminar.find(_conditions, callback);
};

/**
 * Create a new steminar and returns it.
 * @param {Object} Steminar data.
 *
 * @return {Error}, {Steminar} Steminar if created or null.
 */
exports.create = function(data, callback) {
  Steminar.create(data, callback);
};

/**
 * Find a steminar with unique id.
 * @param {ObjectId} Unique id of the steminar.
 *
 * @return {Error}, {Steminar} Steminar if found or null.
 */
exports.get = function(id, callback) {
  Steminar.findById(id, callback);
};

/**
 * Find a steminar with unique id and updates it.
 * @param {Object} Steminar id along with updates.
 *
 * @return {Error}, {Steminar} The updated steminar.
 */
exports.update = function(update, callback) {
  update = Helper.filterOutEmpty(update);
  var id = update.id;
  delete update.id;
  
  Steminar.findByIdAndUpdate(id, update, callback);
};

/**
 * Deletes a steminar from the collection via its id.
 * @param {ObjectId} Steminar id to delete.
 *
 * @return {Error}
 */
exports.delete = function(id, callback) {
  Steminar.remove({ _id: id }, callback);
};


/**
 * Filters and set conditions.
 * @param {Object} Conditions
 *
 * @return {Object} Conditions.
 */
function buildConditions(conditions) {
  var _conditions = {};

  // Search for these fields using Regular Expression search.
  if (conditions.title)    { _conditions.title    = new RegExp(conditions.title,    'i'); }
  if (conditions.location) { _conditions.location = new RegExp(conditions.location, 'i'); }
  if (conditions.host)     { _conditions.host     = new RegExp(conditions.host,     'i'); }
  
  if (conditions.date) { _conditions.date = conditions.date; }
  else if (conditions.start_date || conditions.end_date) {
    _conditions.date = {};

    if (conditions.start_date) { _conditions.date.$gte = conditions.start_date; }
    if (conditions.end_date)   { _conditions.date.$lte = conditions.end_date;   }
  }

  return _conditions;
}