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
  // noinspection Eslint
  let proto = s.__proto__
  Object.assign(s, schema, {
    __proto__: proto
  })
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
    let { valid, error } = tv4.validateResult(values, s)
    if (valid) {
      return null
    }
    let { code, message, params, dataPath, schemaPath } = error
    return {
      id: uuid.v4(),
      code,
      title: message,
      detail: `${JSON.stringify(params)}`,
      source: {
        pointer: dataPath
      },
      meta: {
        tv4Error: { code, message, params, dataPath, schemaPath },
        schema: s.toJSON()
      }
    }
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
    let values = Object.assign({}, s)
    Object.keys(values).forEach((key) => {
      let isFunc = iftype.isFunction(values[ key ])
      if (isFunc) {
        delete values[ key ]
      }
    })
    return values
  }
}

module.exports = ASchema
