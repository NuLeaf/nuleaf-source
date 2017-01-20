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
 *           name          : Filter for posts with this name.
 *           content       : Filter for posts with this content.
 *           author        : Filter for posts with this author.
 *           date_created  : Filter for posts created on this date.
 *           date_published: Filter for posts published on this date.
 *           date_modified : Filter for posts modified on this date.
 *           skip          : Return a certain number of results after a certain number documents.
 *           limit         : Used to specify the maximum number of results to be returned.
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

  delete conditions.skip;
  delete conditions.limit;

  var _condiitons = buildConditions(conditions);

  if ( Post.postSchema.paths.hasOwnProperty(conditions.sortBy)) {
    var sort = {};
    sort[conditions.sortBy] = +conditions.sort;
    delete conditions.sortBy;
    delete conditions.sort;
    Post.find(_conditions).skip(skip).limit(limit).sort(sort).exec(callback);
  }
  else
    Post.find(_conditions).skip(skip).limit(limit).exec(callback);
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
  if (conditions.date_created) { _conditions.date_created = new RegExp(conditions.date_created, 'i'); }
  if (conditions.date_published) { _conditions.date_published = new RegExp(conditions.date_published, 'i'); }
  if (conditions.date_modified) { _conditions.date_modified = new RegExp(conditions.date_modified, 'i')}
  
  return _conditions;
}
