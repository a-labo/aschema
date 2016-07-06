/**
 * Create a schema instance
 * @function create
 * @returns {ASchema} - Schema instnace
 */
'use strict'

const ASchema = require('./aschema')

/** @lends create */
function create (...args) {
  return new ASchema(...args)
}

module.exports = create
