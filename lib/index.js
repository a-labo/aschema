/**
 * JSON schema validator
 * @module aschema
 * @version 2.0.4
 */
'use strict'

const ASchema = require('./aschema')
const create = require('./create')

let lib = create.bind(this)

Object.assign(lib, ASchema, {
  create,
  ASchema
})

module.exports = lib
