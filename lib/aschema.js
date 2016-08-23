/**
 * A schema instance
 * @class ASchema
 */

'use strict'

const tv4 = require('tv4')
const uuid = require('uuid')
const iftype = require('iftype')

/** @lends ASchema */
function ASchema (schema) {
  const s = this
  schema = schema || {}
  if (schema.toJSON) {
    schema = schema.toJSON()
  }
  // noinspection Eslint
  let { __proto__ } = s
  // noinspection Eslint
  s.__proto__ = Object.assign({ schema }, schema, __proto__)
}

ASchema.prototype = {
  /**
   * Validate values.
   * @param {object} values - Values to validate.
   * @param {object} [options] - Optional settings.
   * @returns {object|null} - Null if success.
   */
  validate (values, options = {}) {
    const s = this
    let { valid, errors } = tv4.validateMultiple(values, s)
    if (valid) {
      return null
    }
    let {
      assign,
      name = 'SchemaError'
    } = options
    let { schema = {} } = s
    let error = new Error(
      `Validation failed with schema: ${schema.title || schema.id || schema.description}`
    )
    return Object.assign(error, {
      id: uuid.v4(),
      name,
      errors,
      schema,
      values,
      engine: 'tv4'
    }, assign)
  },
  /**
   * Throw an error if validate failed
   * @throws Error
   */
  validateToThrow (...args) {
    const s = this
    let error = s.validate(...args)
    if (error) {
      throw error
    }
  },
  /**
   * Create a clone instance.
   * @returns {ASchema}
   */
  clone () {
    const s = this
    let schema = s.toJSON()
    return new ASchema(schema)
  },
  /**
   * Set values.
   * @param {object} values - Values to set
   * @returns {ASchema} - Returns self.
   */
  set (values) {
    const s = this
    if (arguments.length === 2) {
      values = {}
      let key = arguments[ 0 ]
      values[ key ] = arguments[ 1 ]
    }
    Object.assign(s, values)
    return s
  },
  /**
   * Convert to json.
   * @returns {object} - JSON schema.
   */
  toJSON () {
    const s = this
    let values = Object.assign({}, s.schema)
    Object.keys(values).forEach((key) => {
      let isFunc = iftype.isFunction(values[ key ])
      if (isFunc) {
        delete values[ key ]
      }
    })
    return values
  }
}

Object.assign(ASchema, { tv4 })

module.exports = ASchema
