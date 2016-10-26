/**
 * Events Controller
 *
 * This controller handles requests for creating, updating, deleting, and searching
 * events. All responses are in JSON format.
 */

/* jslint node: true */
'use strict';

var EventsDAO = require('../database/events');


/**
 * Search for events in the database. A successful response will always
 * be an array even if no events were found matching the filters.
 *
 * Parameters list:
 *   title     : Filter for events with this title.
 *   start_date: Filter for events after this date.
 *   end_date  : Filter for events before this date.
 *   location  : Filter for events with this location.
 *   skip      : The amount of events skipped search on a certain page.
 *   limit     : The cutoff number of events displayed on each page.
 */
exports.search = function(req, res) {
  EventsDAO.find({
    title     : req.query.title,
    start_date: req.query.start_date,
    end_date  : req.query.end_date,
    location  : req.query.location,
    skip      : req.query.skip,
    limit     : req.query.limit
  }, function(err, events) {
    if (err) { return res.status(500).json(err); }
    return res.status(200).json(events);
  });
};

/**
 * Stores an event in the database. The response will contain a object with the
 * key 'success' mapped to a boolean representing the result of the insert.
 *
 * POST data:
 *   title   : The title of the event.
 *   date    : Datetime of the event.
 *   location: The location of the event.
 */
exports.store = function(req, res) {
  EventsDAO.create({
    title   : req.body.title,
    date    : req.body.date,
    location: req.body.location
  }, function(err, event) {
    if (err) { return res.status(500).json(err); }
    if (!event) { return res.json({ success: false }); } // TODO: HTTP status code?
    return res.status(201).json({ success: true });
  });
};

/**
 * Retrieve an event based on its id. This will return a HTTP status code 404 if the
 * event is not found.
 */
exports.get = function(req, res) {
  EventsDAO.get(req.params.id, function(err, event) {
    if (err) {
      switch(err.name) {
        case 'CastError':
          res.status(400).json({ error: 'Not a valid event id.' });
          return;
        default:
          res.status(500).json(err);
          return;
      }
    }
    if (!event) { return res.status(404).json({ error: 'Event does not exists.' }); }
    return res.status(200).json(event);
  });
};

/**
 * Updates an event with specified id. This will return a HTTP status code 404 if the
 * event is not found.
 *
 * POST data:
 *   title   : The title of the event.
 *   date    : Datetime of the event.
 *   location: The location of the event.
 */
exports.update = function(req, res) {
  EventsDAO.update({
    id      : req.params.id,
    title   : req.body.title,
    data    : req.body.date,
    location: req.body.location
  }, function(err, event) {
    if (err) {
      switch(err.name) {
        case 'CastError':
          res.status(400).json({ error: 'Not a valid event id.' });
          return;
        default:
          res.status(500).json(err);
          return;
      }
    }
    if (!event) { return res.json({ success: false }); } // TODO: HTTP status code?
    return res.status(201).json({ success: true });
  });
};

/**
 * Deletes an event with the specified id from the database. This will return a HTTP
 * status code 404 if the event is not found.
 */
exports.destroy = function(req, res) {
  EventsDAO.delete(req.params.id, function(err) {
    if (err) { return res.status(500).json(err); }
    return res.status(200).json({ success: true });
  });
};