/**
 * Users Controller
 *
 * This controller handles requests for creating, updating, deleting, and searching
 * users. All responses are in JSON format.
 */

/* jslint node: true */
'use strict';

var UsersDAO = require('../database/users');


/**
 * Search for users in the database. A successful response will always
 * be an array even if no users were found matching the filters.
 *
 * Parameters list:
 *   username : Filter for users with this username.
 *   email    : Filter for users with this email.
 *   firstname: Filter for users with this firstname.
 *   lastname : Filter for users with this lastname.
 *   active   : Filter for users that are active (cannot be combined with inactive).
 *   inactive : Filter for users that are inactive (cannot be commined with active).
 *   team_name: Filter for users by which team they belong to.
 *   sort     : Stores a number that determines if the results are shown in de/ascending order.
 *   sortBy   : Stores the attribute above that the results are sorted by.
 *   skip     : Return a certain number of results after a certain number of documents.
 *   limit    : Used to specify the maximum number of results to be returned.
 */
exports.search = function(req, res) {
  UsersDAO.find({
    username : req.query.username,
    email    : req.query.email,
    firstname: req.query.firstname,
    lastname : req.query.lastname,
    is_active: req.query.hasOwnProperty('active') ? true : (req.query.hasOwnProperty('inactive') ? false : undefined),
    team_name: req.query.team_name,
    sort     : req.query.sort,
    sortBy   : req.query.sortBy,
    skip     : req.query.skip,
    limit    : req.query.limit
  }, function(err, users) {
    if (err) { return res.status(500).json({ error: err }); }
    return res.status(200).json(users);
  });
};

/**
 * Counts the number of users in the database. A successful response will 
 * always be a number even if that number is 0.
 *
 * Parameters list:
 *   title     : Filter for events with this title.
 *   start_date: Filter for events after this date.
 *   end_date  : Filter for events before this date.
 *   location  : Filter for events with this location.
 */
exports.count = function(req, res) {
  UsersDAO.count({
    username : req.query.username,
    email    : req.query.email,
    firstname: req.query.firstname,
    lastname : req.query.lastname,
    is_active: req.query.hasOwnProperty('active') ? true : (req.query.hasOwnProperty('inactive') ? false : undefined),
    team_name: req.query.team_name
  }, function(err, count) {
    if (err) { return res.status(500).json({ error: err }); }
    return res.status(200).json(count);
  });
};

/**
 * Stores a user in the database. The response will contain the new user.
 *
 * POST data:
 *   username   : The username of the user (unique).
 *   email      : The email of the user (unique).
 *   password   : The password of the user.
 *   firstname  : THe firstname of the user.
 *   lastname   : The lastname of the user.
 *   image      : The url of the user's profile image.
 *   is_active  : Whether the user is active or not (Default: true).
 *   team_id    : The team id of the user (Can be set later).
 *   description: The description of this user.
 */
exports.store = function(req, res) {
  UsersDAO.create({
    username   : req.body.username,
    email      : req.body.email,
    password   : req.body.password,
    firstname  : req.body.firstname,
    lastname   : req.body.lastname,
    image      : req.body.image,
    is_active  : req.body.is_active,
    team_id    : req.body.team_id,
    description: req.body.description
  }, function(err, user) {
    if (err || !user) {
      if (err && err.name === 'CastError') {
        return res.status(400).json({ error: 'Not a valid team id.' });
      }
      return res.status(500).json({ error: err || 'Failed to create user.'});
    }
    return res.status(201).json(user);
  });
};

/**
 * Retrieve a user with specified id. This will return a HTTP status code 404 if the
 * user is not found.
 */
exports.get = function(req, res) {
  UsersDAO.get(req.params.id, function(err, user) {
    if (err) {
      switch(err.name) {
      case 'CastError':
        return res.status(400).json({ error: 'Not a valid user id.' });
      default:
        return res.status(500).json({ error: err });
      }
    }
    if (!user) { return res.status(404).json({ error: 'User does not exists.'}); }
    return res.status(200).json(user);
  });
};

/**
 * Updates a user with specified id. This will return a HTTP status code 404 if the
 * user is not found.
 *
 * POST data:
 *   id         : The id of the user (query string).
 *   username   : The username of the user (unique).
 *   email      : The email of the user (unique).
 *   password   : The password of the user.
 *   firstname  : THe firstname of the user.
 *   lastname   : The lastname of the user.
 *   image      : The url of the user's profile image.
 *   is_active  : Whether the user is active or not (Default: true).
 *   team_id    : The team id of the user (Can be set later).
 *   description: The description of this user.
 */
exports.update = function(req, res) {
  UsersDAO.update({
    id         : req.params.id,
    username   : req.body.username,
    email      : req.body.email,
    password   : req.body.password,
    firstname  : req.body.firstname,
    lastname   : req.body.lastname,
    image      : req.body.image,
    is_active  : req.body.is_active,
    team_id    : req.body.team_id,
    description: req.body.description
  }, function(err, user) {
    if (err || !user) {
      if (err && err.name === 'CastError') {
        return res.status(400).json({ error: 'Not a valid user id.' });
      }
      return res.status(500).json({ error: err || 'Failed to update user.' });
    }
    return res.status(201).json(user);
  });
};

/**
 * Deletes a user with the specified id from the database. This will return a HTTP
 * status code 404 if the user is not found.
 */
exports.destroy = function(req, res) {
  UsersDAO.delete(req.params.id, function(err) {
    if (err) { return res.status(500).json({ error: err }); }
    return res.status(200).json({ success: true });
  });
};