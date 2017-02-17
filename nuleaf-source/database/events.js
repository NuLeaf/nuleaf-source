/**
 * Events database access object. Opinionated wrapper around mongoose.
 *
 * Handles requests to events collection.
 */

/* jslint node: true */
'use strict';

var Helper = require('../util/helper');

var Event = require('../models/event');


/**
 * Finds events matching conditions and returns a collection of events.
 * @param  {Object} Conditions:
 *                    title     : Filter for events with this title.
 *                    start_date: Filter for events after this date.
 *                    end_date  : Filter for events before this date.
 *                    location  : Filter for events with this location.
 *                    sort      : Stores a number that determines if the results are shown in de/ascending order.
 *                    sortBy    : Stores the attribute above that the results are sorted by.
 *                    skip      : Return a certain number of results after a certain number of documents.
 *                    limit     : Used to specify the maximum number of results to be returned.
 *
 * @return {Error}, {Array} Array of events, or empty if none found matching conditions.
 */
exports.find = function(conditions, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
  }

  var skip = +conditions.skip || 0;
  var limit = +conditions.limit || 100;

  var _condititons = buildConditions(conditions);
  var query = Event.find(_conditions).skip(skip).limit(limit);

  if (Event.eventSchema.paths.hasOwnProperty(conditions.sortBy)) {
    var sort = {};
    sort[conditions.sortBy] = +conditions.sort;
    query = query.sort(sort);
  }
  query.exec(callback);
};

/**
 * Count events matching conditions and returns a collection of events.
 * @param  {Object} Conditions:
 *                    title     : Filter for events with this title.
 *                    start_date: Filter for events after this date.
 *                    end_date  : Filter for events before this date.
 *                    location  : Filter for events with this location.
 *
 * @return {Error}, {Integer} Integer of events with matching conditions.
 */
exports.count = function(conditions, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
  }

  var _conditions = buildConditions(conditions);
  Event.count(_conditions, callback);
};

/**
 * Create a new event and returns it.
 * @param {Object} Event data.
 *
 * @return {Error}, {Event} Event if created or null.
 */
exports.create = function(data, callback) {
  Event.create(data, callback);
};

/**
 * Find an event with unique id.
 * @param {ObjectId} Unique id of the event.
 *
 * @return {Error}, {Event} Event if found or null.
 */
exports.get = function(id, callback) {
  Event.findById(id, callback);
};

/**
 * Find an event with unique id and updates it.
 * @param {Object} Event id along with updates.
 *
 * @return {Error}, {Event} The updated event.
 */
exports.update = function(update, callback) {
  update = Helper.filterOutEmpty(update);
  var id = update.id;
  delete update.id;
  
  Event.findByIdAndUpdate(id, update, callback);
};

/**
 * Deletes an event from the collection via its id.
 * @param {ObjectId} Event id to delete.
 *
 * @return {Error}
 */
exports.delete = function(id, callback) {
  Event.remove({ _id: id }, callback);
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
  
  if (conditions.date) { _conditions.date = conditions.date; }
  else if (conditions.start_date || conditions.end_date) {
    _conditions.date = {};

    if (conditions.start_date) { _conditions.date.$gte = conditions.start_date; }
    if (conditions.end_date)   { _conditions.date.$lte = conditions.end_date;   }
  }

  return _conditions;
}