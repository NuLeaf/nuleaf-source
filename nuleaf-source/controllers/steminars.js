/**
 * Steminars Controller
 *
 * This controller handles requests for creating, updating, deleting, and searching
 * steminars. All responses are in JSON format.
 */

/* jslint node: true */
'use strict';

var SteminarsDAO = require('../database/steminars');


/**
 * Search for steminars in the database. A successful response will always
 * be an array even if no steminars were found matching the filters.
 *
 * Parameters list:
 *   title     : Filter for steminars with this title.
 *   start_date: Filter for steminars after this date.
 *   end_date  : Filter for steminars before this date.
 *   location  : Filter for steminars with this location.
 *   host      : Filter for steminars with this host.
 */
exports.search = function(req, res) {
  SteminarsDAO.find({
    title     : req.query.title,
    start_date: req.query.start_date,
    end_date  : req.query.end_date,
    location  : req.query.location,
    host      : req.query.host
  }, function(err, steminars) {
    if (err) { return res.status(500).json(err); }
    return res.status(200).json(steminars);
  });
};

/**
 * Stores a steminar in the database. The response will contain a object with the
 * key 'success' mapped to a boolean representing the result of the insert.
 *
 * POST data:
 *   title      : The title of the steminar.
 *   date       : Datetime of the steminar.
 *   location   : The location of the steminar.
 *   host       : The host of the steminar.
 *   image_file : The name of the image file on the server.
 *   description: The description of the steminar. 
 */
exports.store = function(req, res) {
  SteminarsDAO.create({
    title      : req.body.title,
    date       : req.body.date,
    location   : req.body.location,
    host       : req.body.host,
    imageFile  : req.body.image_file,
    description: req.body.description
  }, function(err, steminar) {
    if (err) { return res.status(500).json(err); }
    if (!steminar) { return res.json({ success: false }); } // TODO: HTTP status code?
    return res.status(201).json({ success: true });
  });
};

/**
 * Retrieve a steminar based on its id. This will return a HTTP status code 404 if the
 * steminar is not found.
 */
exports.get = function(req, res) {
  SteminarsDAO.get(req.params.id, function(err, steminar) {
    if (err) {
      switch(err.name) {
        case 'CastError':
          res.status(400).json({ error: 'Not a valid steminar id.' });
          return;
        default:
          res.status(500).json(err);
          return;
      }
    }
    if (!steminar) { return res.status(404).json({ error: 'Steminar does not exists.' }); }
    return res.status(200).json(steminar);
  });
};

/**
 * Updates a steminar with specified id. This will return a HTTP status code 404 if the
 * steminar is not found.
 *
 * POST data:
 *   title      : The title of the steminar.
 *   date       : Datetime of the steminar.
 *   location   : The location of the steminar.
 *   host       : The host of the steminar.
 *   image_file : The name of the image file on the server.
 *   description: The description of the steminar.
 */
exports.update = function(req, res) {
  SteminarsDAO.update({
    id         : req.params.id,
    title      : req.body.title,
    date       : req.body.date,
    location   : req.body.location,
    host       : req.body.host,
    imageFile  : req.body.image_file,
    description: req.body.description
  }, function(err, steminar) {
    if (err) {
      switch(err.name) {
        case 'CastError':
          res.status(400).json({ error: 'Not a valid steminar id.' });
          return;
        default:
          res.status(500).json(err);
          return;
      }
    }
    if (!steminar) { return res.json({ success: false }); } // TODO: HTTP status code?
    return res.status(201).json({ success: true });
  });
};

/**
 * Deletes an steminar with the specified id from the database. This will return a HTTP
 * status code 404 if the steminar is not found.
 */
exports.destroy = function(req, res) {
  SteminarsDAO.delete(req.params.id, function(err) {
    if (err) { return res.status(500).json(err); }
    return res.status(200).json({ success: true });
  });
};