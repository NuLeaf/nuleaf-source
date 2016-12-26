/**
 * Teams database access object. Opinionated wrapper around mongoose.
 *
 * Handles requests to teams collection.
 */

/* jslint node: true */
'use strict';

var mongoose = require('mongoose');
var Helper = require('../util/helper');
var TeamDAO = require('./teams');

var User = require('../models/user');


/**
 * Finds users matching conditions and returns a collection of users.
 * @param  {Object} Conditions:
 *                    username : Filter for users with this username.
 *                    email    : Filter for users with this email.
 *                    firstname: Filter for users with this firstname.
 *                    lastname : Filter for users with this lastname.
 *                    is_active: Filter for users that are active (if true) or inactive (if false).
 *                    team_name: Filter for users by which team they belong to.
 *                    skip     : Return a certain number of results after a certain number of documents.
 *                    limit    : Used to specify the maximum number of results to be returned.
 *
 * @return {Error}, {Array} Array of users, or empty if none found matching conditions.
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
  User.find(_conditions).skip(skip).limit(limit).exec(callback);
};

/**
 * Count users matching conditions and returns a collection of users.
 * @param  {Object} Conditions:
 *                    title     : Filter for users with this title.
 *                    start_date: Filter for users after this date.
 *                    end_date  : Filter for users before this date.
 *                    location  : Filter for users with this location.
 *
 * @return {Error}, {Integer} Integer of users with matching conditions.
 */
exports.count = function(conditions, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
  }

  var _conditions = buildConditions(conditions);
  User.count(_conditions, callback);
};

/**
 * Create a new user and returns it.
 * @param {Object} User data.
 *
 * @return {Error}, {User} User if created or null.
 */
exports.create = function(data, callback) {
  if (data.team_id) {
    TeamDAO.get(data.team_id, function(err, team) {
      if (err || !team) {
        callback(err || 'Team does not exists.');
        return;
      }
      data.team_name = team.name;
      User.create(data, callback);
    });
    return;
  }

  User.create(data, callback);
};

/**
 * Find a user with unique id.
 * @param {ObjectId} Unique id of the user.
 *
 * @return {Error}, {User} User if found or null.
 */
exports.get = function(id, callback) {
  User.findById(id, callback);
};

/**
 * Find a user with unique id and updates it.
 * @param {Object} User id along with updates.
 *
 * @return {Error}, {User} The updated user.
 */
exports.update = function(update, callback) {
  update = Helper.filterOutEmpty(update);
  var id = update.id;
  delete update.id;

  if (update.team_id) {
    TeamDAO.get(update.team_id, function(err, team) {
      if (err || !team) {
        callback(err || 'Team does not exists.');
        return;
      }
      update.team_name = team.name;
      User.findByIdAndUpdate(id, update, callback);
    });
    return;
  }
  
  User.findByIdAndUpdate(id, update, callback);
};

/**
 * Deletes a user from the collection via its id.
 * @param {ObjectId} User id to delete.
 *
 * @return {Error}
 */
exports.delete = function(id, callback) {
  User.remove({ _id: id }, callback);
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
  if (conditions.username)  { _conditions.username  = new RegExp(conditions.username,  'i'); }
  if (conditions.email)     { _conditions.email     = new RegExp(conditions.email,     'i'); }
  if (conditions.firstname) { _conditions.firstname = new RegExp(conditions.firstname, 'i'); }
  if (conditions.lastname)  { _conditions.lastname  = new RegExp(conditions.lastname,  'i'); }
  if (conditions.team_name) { _conditions.team_name = new RegExp(conditions.team_name, 'i'); }

  if (conditions.is_active !== undefined) { _conditions.is_active = conditions.is_active; }
  return _conditions;
}