/**
 * JSON schema validator
 * @module aschema
 * @version 3.1.0
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
