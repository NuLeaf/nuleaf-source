/**
 * Teams database access object. Opinionated wrapper around mongoose.
 *
 * Handles requests to teams collection.
 */

/* jslint node: true */
'use strict';

var Helper = require('../util/helper');

var Team = require('../models/team');


/**
 * Finds teams matching conditions and returns a collection of steminars.
 * @param  {Object} Conditions:
 *                    name : Filter for team with this name.
 *                    skip : Return a certain number of results after a certain number of documents.
 *                    limit: Used to specify the maximum number of results to be returned.
 *                    
 * @return {Error}, {Array} Array of teams, or empty if none found matching conditions.
 */
exports.find = function(conditions, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
  }

  var skip = +conditions.skip;
  var limit = +conditions.limit;

  delete conditions.skip;
  delete conditions.limit;

  var _conditions = buildConditions(conditions);
  Team.find(_conditions).skip(skip).limit(limit).exec(callback);
};

/**
 * Create a new team and returns it.
 * @param {Object} Team data.
 *
 * @return {Error}, {Team} Team if created or null.
 */
exports.create = function(data, callback) {
  Team.create(data, callback);
};

/**
 * Find a team with unique id.
 * @param {ObjectId} Unique id of the team.
 *
 * @return {Error}, {Team} Team if found or null.
 */
exports.get = function(id, callback) {
  Team.findById(id, callback);
};

/**
 * Find a team with unique id and updates it.
 * @param {Object} Team id along with updates.
 *
 * @return {Error}, {Team} The updated team.
 */
exports.update = function(update, callback) {
  update = Helper.filterOutEmpty(update);
  var id = update.id;
  delete update.id;
  
  Team.findByIdAndUpdate(id, update, callback);
};

/**
 * Deletes a team from the collection via its id.
 * @param {ObjectId} Team id to delete.
 *
 * @return {Error}
 */
exports.delete = function(id, callback) {
  Team.remove({ _id: id }, callback);
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
  if (conditions.name) { _conditions.name = new RegExp(conditions.name, 'i'); }
  return _conditions;
}