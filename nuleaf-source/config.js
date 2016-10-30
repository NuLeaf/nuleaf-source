/**
 * Example configuration file for the server. Rename this file to config.js.
 */

/* jslint node: true */
'use strict';

module.exports = {
  dbURL: process.env.NULEAF_SOURCE_DB_URL || 'mongodb://localhost/nuleaf_source'
};
