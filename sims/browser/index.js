/**
 * JSON schema validator
 * @module aschema
 */
'use strict';

var ASchema = require('./aschema');
var create = require('./create');

var lib = create.bind(lib);

Object.assign(lib, ASchema, {
  create: create,
  ASchema: ASchema
});

module.exports = lib;