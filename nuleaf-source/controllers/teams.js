/**
 * Teams Controller
 *
 * This controller handles requests for creating, updating, deleting, and searching
 * teams. All responses are in JSON format.
 */

/* jslint node: true */
'use strict';

var TeamsDAO = require('../database/teams');


/**
 * Search for teams in the database. A successful response will always
 * be an array even if no teams were found matching the filters.
 *
 * Parameters list:
 *   name : Filter for teams with this name.
 *   skip : Return a certain number of results after a certain number of documents.
 *   limit: Used to specify the maximum number of results to be returned.
 */
exports.search = function(req, res) {
  TeamsDAO.find({
    name : req.query.name,
    skip : req.query.skip,
    limit: req.query.limit
  }, function(err, teams) {
    if (err) { return res.status(500).json(err); }
    return res.status(200).json(teams);
  });
};

/**
 * Stores a team in the database. The response will contain an object with the
 * key 'success' mapped to a boolean representing the result of the insert.
 *
 * POST data:
 *   name: The name of the team.
 */
exports.store = function(req, res) {
  TeamsDAO.create({
    name: req.body.name
  }, function(err, team) {
    if (err) { return res.status(500).json(err); }
    if (!team) { return res.json({ success: false }); } // TODO: HTTP status code?
    return res.status(201).json({ success: true });
  });
};

/**
 * Retrieve a team with specified id. This will return a HTTP status code 404 if the
 * team is not found.
 */
exports.get = function(req, res) {
  TeamsDAO.get(req.params.id, function(err, team) {
    if (err) {
      switch(err.name) {
      case 'CastError':
        return res.status(400).json({ error: 'Not a valid team id.' });
      default:
        return res.status(500).json(err);
      }
    }
    if (!team) { return res.status(404).json({ error: 'Team does not exists.'}); }
    return res.status(200).json(team);
  });
};

/**
 * Updates a team with specified id. This will return a HTTP status code 404 if the
 * team is not found.
 *
 * POST data:
 *   name: The name of the team.
 */
exports.update = function(req, res) {
  TeamsDAO.update({
    id:   req.params.id,
    name: req.body.name
  }, function(err, team) {
    if (err) {
      switch(err.name) {
      case 'CastError':
        return res.status(400).json({ error: 'Not a valid team id.' });
      default:
        return res.status(500).json(err);
      }
    }
    if (!team) { return res.json({ success: false }); } // TODO: HTTP status code?
    return res.status(201).json({ success: true });
  });
};

/**
 * Deletes a team with the specified id from the database. This will return a HTTP
 * status code 404 if the team is not found.
 */
exports.destroy = function(req, res) {
  TeamsDAO.delete(req.params.id, function(err) {
    if (err) { return res.status(500).json(err); }
    return res.status(200).json({ success: true });
  });
};