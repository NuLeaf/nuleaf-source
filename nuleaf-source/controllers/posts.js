/**
 * Posts Controller
 * 
 * This controller handles requests for creating, updating, deleting, and searching 
 * posts. All responses are in JSON format.
 */

/* jslint node: true */
'use strict';

var PostsDAO = require('..database/posts');


/**
 * Search for posts in the database. A successful response will always
 * be an array even if no steminars were found matching the filters.
 *
 * Parameters list:
 *     title           : Filter for posts with this title.
 *     content         : Filter for posts with this content.
 *     author          : Filter for posts with this author.
 *     sort            : Stores a number that determines if the results are shown in de/ascending order.
 *     sortBy          : Stores the attribute above that the results are sorted by.
 *     skip            : Return a certain number of results after a certain number of documents.
 *     limit           : Used to specify the maximum number of results to be returned.
 *     created_before  : Filter for posts after this date.
 *     created_after   : Filter for posts before this date.
 *     published_before: Filter for posts after this date.
 *     published_after : Filter for posts before this date.
 *     modified_before : Filter for posts after this date.
 *     modified_after  : Filter for posts before this date.
 */
exports.search = function(req, res) {
  PostsDao.find({
    title         : req.query.title,
    content       : req.query.content,
    author        : req.query.author,
    sort          : req.query.sort,
    sortBy        : req.query.sortBy,
    skip          : req.query.skip,
    limit         : req.query.limit,
    created_before: req.query.created_before,
    created_after : req.query.created_after,
    published_before: req.query.published_before,
    published_after : req.query.published_after,
    modified_before : req.query.modified_before,
    modified_after  : req.query.modified_after
  }, function(err, steminars) {
   	if (err) { return res.status(500).json({ error: err }); }
   	return res.status(200).json(posts);
  });
 };

/**
 * Counts the number of posts in the database. A successful response will
 * always be a number even if that number is 0.
 *
 * Parameters list:
 *   title         : Filter for posts with this title.
 *   content       : Filter for posts with this content.
 *   author        : Filter for posts with this author.
 *   date_created  : Filter for posts created on this date.
 *   date_published: Filter for posts published on this date.
 *   date_modified : Filter for posts modified on this date.
 */
exports.count = function(req, res) {
  PostsDAO.count({
	  title         : req.query.title,
   	content       : req.query.content,
   	author        : req.query.author,
   	date_created  : req.query.date_created,
   	date_published: req.query.date_published,
   	date_modified : req.query.date_modified
  }, function(err, count) {
  	if (err) { return res.status(500).json({ error: err }); }
  	return res.status(200).json(count);
  });
};

/**
 * Stores a post in the database. The response will contain the new post.
 *
 * POST data:
 *   title         : The title of the post.
 *   content       : The content of the post.
 *   author        : The author of the post.
 *   date_created  : The date the post was created.
 *	 date_published: The date the post was published.
 *   date_modified : The date the post was modified.
 */
exports.store = function(req, res) {
  PostsDAO.create({
	  title         : req.query.title,
   	content       : req.query.content,
   	author        : req.query.author,
   	date_created  : req.query.date_created,
   	date_published: req.query.date_published,
   	date_modified : req.query.date_modified
  }, function(err, post) {
	if (err || !post) {
	  return res.status(500).json({ error: err || 'Failed to create post.'});
	}
	return res.status(201).json(post);
  });
};

/**
 * Retrieve a post based on its id. This will return a HTTP status code 404 if the 
 * post is not found.
 */
exports.get = function(req, res) {
  PostsDAO.get(req.params.id, function(err, post) {
  	if (err) {
  	  switch(err.name) {
  	  case 'CastError':
  	  	return res.status(400).json({ error: 'Not a valid post id.'});
  	  default:
  	  	return res.status(500).json({ error: err });
  	  }
  	}
  	if (!post) { return res.status(404).json({ error: 'Post does not exist.'}); }
  	return res.status(200).json(post);
  });
};

/**
 * Updates a post with specified id. This will return a HTTP status code 404 if the
 * post is not found.
 *
 * POST data:
 *   id         : The id of the post (query string).
 *   title         : The title of the post.
 *   content       : The content of the post.
 *   author        : The author of the post.
 *   date_created  : The date the post was created.
 *	 date_published: The date the post was published.
 *   date_modified : The date the post was modified.
 */
exports.update = function(req, res) {
  PostsDAO.update({
  	id            : req.params.id,
  	title         : req.params.title,
  	content       : req.params.content,
  	author        : req.params.author,
  	date_created  : req.params.date_created,
  	date_published: req.params.date_published,
  	date_modified : req.params.date_modified,
  }, function(err, post) {
  	if (err || !post) {
  	  if (err && err.name === 'CastError') {
  	  	return res.status(400).json({ error: 'Not a valid post id.'});
  	  }
  	  return res.status(500).json({ error: err || 'Failed to update post.'})
  	}
  	return res.status(201).json(post);
  });
};

/**
 * Deletes a post with the specified id from the database. This will return a HTTP
 * status code 404 if the post is not found
 */
exports.destroy = function(req, res) {
  PostsDAO.delete(req.params.id, function(err) {
  	if (err) { return res.status(500).json({ error: err}); }
  	return res.status(200).json({ success: true });
  });
};
