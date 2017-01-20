/**
 * Route declarations for Nuleaf Source REST API.
 */

/* jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();

// Controllers
var EventsController    = require('./controllers/events');
var PostsController     = require('./controllers/posts');
var SteminarsController = require('./controllers/steminars');
var UsersController     = require('./controllers/users');
var TeamsController     = require('./controllers/teams');

/**
 * Routes
 */

// Events
router.get   ('/events',       EventsController.search);
router.post  ('/events',       EventsController.store);
router.get   ('/events/count', EventsController.count);
router.get   ('/events/:id',   EventsController.get);
router.patch ('/events/:id',   EventsController.update);
router.delete('/events/:id',   EventsController.destroy);

// Posts
router.get   ('/posts',       PostsController.search);
router.post  ('/posts',       PostsController.store);
router.get   ('/posts/count', PostsController.count);
router.get   ('/posts/:id',   PostsController.get);
router.patch ('/posts/:id',   PostsController.update);
router.delete('/posts/:id',   PostsController.destroy);

// Steminars
router.get   ('/steminars',       SteminarsController.search);
router.post  ('/steminars',       SteminarsController.store);
router.get   ('/steminars/count', SteminarsController.count);
router.get   ('/steminars/:id',   SteminarsController.get);
router.patch ('/steminars/:id',   SteminarsController.update);
router.delete('/steminars/:id',   SteminarsController.destroy);

// Users
router.get   ('/users',       UsersController.search);
router.post  ('/users',       UsersController.store);
router.get   ('/users/count', UsersController.count);
router.get   ('/users/:id',   UsersController.get);
router.patch ('/users/:id',   UsersController.update);
router.delete('/users/:id',   UsersController.destroy);

// Teams
router.get   ('/teams',       TeamsController.search);
router.post  ('/teams',       TeamsController.store);
router.get   ('/teams/count', TeamsController.count);
router.get   ('/teams/:id',   TeamsController.get);
router.patch ('/teams/:id',   TeamsController.update);
router.delete('/teams/:id',   TeamsController.destroy);

module.exports = router;
