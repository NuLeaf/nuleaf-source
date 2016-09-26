/**
 * Utility helper functions.
 */

 /* jslint node: true */
'use strict';

/**
 * Remove null values from the object.
 * @param {Object} Object with possible null/undefined values.
 *
 * @return {Object} Object with no null/undefined values.
 */
exports.filterOutEmpty = function(obj) {
  var _obj = {};

  for (var key in obj) {
    if (!obj.hasOwnProperty(key) || obj[key] === null || obj[key] === undefined) { continue; }
    _obj[key] = obj[key];
  }

  return _obj;
};
