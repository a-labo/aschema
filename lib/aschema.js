

'use strict'

const tv4 = require('tv4')
const {v4:uuid} = require('uuid')
const iftype = require('iftype')

/**
 * A schema instance
 * @class ASchema
 */
function ASchema (schema) {
  schema = schema || {}
  if (schema.toJSON) {
    schema = schema.toJSON()
  }
  // noinspection Eslint
  let { __proto__ } = this
  // noinspection Eslint
  this.__proto__ = Object.assign({ schema }, schema, __proto__)
}

ASchema.prototype = {
  /**
   * Validate values.
   * @param {object} values - Values to validate.
   * @param {object} [options] - Optional settings.
   * @returns {object|null} - Null if success.
   */
  validate (values, options = {}) {
    let { valid, errors } = tv4.validateMultiple(values, this)
    if (valid) {
      return null
    }
    let {
      assign,
      name = 'SchemaError'
    } = options
    let { schema = {} } = this
    let error = new Error(
      `Validation failed with schema: ${schema.title || schema.id || schema.description}`
    )
    return Object.assign(error, {
      id: uuid(),
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
    let error = this.validate(...args)
    if (error) {
      throw error
    }
  },
  /**
   * Create a clone instance.
   * @returns {ASchema}
   */
  clone () {
    const schema = this.toJSON()
    return new ASchema(schema)
  },
  /**
   * Set values.
   * @param {object} values - Values to set
   * @returns {ASchema} - Returns self.
   */
  set (values) {
    if (arguments.length === 2) {
      values = {}
      let key = arguments[ 0 ]
      values[ key ] = arguments[ 1 ]
    }
    Object.assign(this, values)
    return this
  },
  /**
   * Convert to json.
   * @returns {object} - JSON schema.
   */
  toJSON () {
    let values = Object.assign({}, this.schema)
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
