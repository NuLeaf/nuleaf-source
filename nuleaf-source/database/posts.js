/**
 * Posts database access object. Opinionated wrapper around mongoose.
 *
 * Handles requests to posts collection.
 */

/* jslint node: true */
'use strict';

var Helper = require('../util/helper');

var Post = require('../models/post');


/**
 * Finds posts matching conditions and returns a collection of posts.
 * @param {Object} Conditions:
 *                   name            : Filter for posts with this name.
 *                   content         : Filter for posts with this content.
 *                   author          : Filter for posts with this author.
 *                   date_created    : Filter for posts created on this date.
 *                   date_published  : Filter for posts published on this date.
 *                   date_modified   : Filter for posts modified on this date.
 *                   sort            : Stores a number that determines if the results are shown in de/ascending order.
 *                   sortBy          : Stores the attribute above that the results are sorted by.
 *                   skip            : Return a certain number of results after a certain number of documents.
 *                   limit           : Used to specify the maximum number of results to be returned.
 *                   created_before  : Filter for posts after this date.
 *                   created_after   : Filter for posts before this date.
 *                   published_before: Filter for posts after this date.
 *                   published_after : Filter for posts before this date.
 *                   modified_before : Filter for posts after this date.
 *                   modified_after  : Filter for posts before this date.
 *
 * @return {Error}, {Array} Array of posts, or empty if none found matching conditions.
 */
exports.find = function(conditions, callback) {
  if (typeof conditions === 'function') {
 	  callback = conditions;
 	  conditions = {};
  }

  var skip = +conditions.skip;
  var limit = +conditions.limit;

  var _condititons = buildConditions(conditions);

  var query = Post.find(_conditions).skip(skip).limit(limit);

  if (Post.postSchema.paths.hasOwnProperty(conditions.sortBy)) {
    var sort = {};
    sort[conditions.sortBy] = +conditions.sort;
    query = query.sort(sort);
  }
  query.exec(callback);
};

/**
 * Count posts matching conditions and returns a collection of posts.
 * @param {Object} Conditions:
 *                   title         : Filter for posts with this title.
 *                   content       : Filter for posts with this content.
 *                   author        : Filter for posts with this author.
 *                   date_created  : Filter for posts created on this date.
 *                   date_published: Filter for posts published on this date.
 *                   date_modified : Filter for posts modified on this date.
 *
 * @return {Error}, {Integer} Integer of posts with matching conditions.
 */
 exports.count = function(conditions, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
 	conditions = {};
  }

  var _conditions = buildConditions(conditions);
  Post.count(_conditions, callback);
};

/**
 * Creates a new post and returns it.
 * @param {Object} Post data.
 * 
 * @return {Error}, {Post} Post if created or null.
 */
exports.create = function(data, callback) {
	Post.create(data, callback);
};

/**
 * Find a post with unique id.
 * @param {ObjectId} Unique id of the post.
 *
 * @return {Error}, {Post} Post if found or null.
 */
exports.get = function(id, callback) {
	Post.findById(id, callback);
};

/**
 * Find a post with unique id and updates it.
 * @param {Object} Post id along with updates.
 *
 * @return {Error}, {Post} The updated post
 */
exports.update = function(update, callback) {
  update = Helper.filterOutEmpty(update);
  var id = update.id;
  delete update.id;

  Post.findByIdAndUpdate(id, update, callback);
};

/**
 * Deletes a post from the collection via its id.
 * @param {ObjectsId} Post id to delete.
 *
 * @return {Error}
 */
exports.delete = function(id, callback) {
  Post.remove({ _id: id }, callback);
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
  if (conditions.title) { _conditions.title = new RegExp(conditions.title, 'i'); }
  if (conditions.content) { _conditions.content = new RegExp(conditions.content, 'i'); }
  if (conditions.author) { _conditions.author = new RegExp(conditions.author, 'i'); }
  
  if (conditions.date_created) { _conditions.date_created = conditions.date_created; }
  if (conditions.date_published) { _conditions.date_published = conditions.date_published; }
  if (conditions.date_modified) { _conditions.date_modified = conditions.date_modified; }
  
  else if (conditions.created_before || conditions.created_after) {
    _conditions.date_created = {};

    if (conditions.created_before) { _conditions.date_created.$gte = conditions.created_before; }
    if (conditions.created_after) { _conditions.date_created.$lte = conditions.created_after; }
  }
  else if (conditions.published_before || conditions.published_after) {
    _conditions.date_published = {};

    if (conditions.published_before) { _conditions.date_published.$gte = conditions.published_before; }
    if (conditions.published_after) { _conditions.date_published.$lte = conditions.published_after; }
  }
  else if (conditions.modified_before || condtions.modified_after) {
    _conditions.date_modified = {};

    if (conditions.modified_before) { _conditions.date_modified.$gte = conditions.modified_before; }
    if (conditions.modified_after) { _conditions.date_modified.$lte = conditions.modified_after; }
  }
  
  return _conditions;
}
