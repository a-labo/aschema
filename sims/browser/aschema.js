/**
 * A schema instance
 * @class ASchema
 */

'use strict';

var tv4 = require('tv4');
var uuid = require('uuid');
var iftype = require('iftype');

/** @lends ASchema */
function ASchema(schema) {
  var s = this;
  schema = schema || {};
  // noinspection Eslint
  var proto = s.__proto__;
  Object.assign(s, schema, {
    __proto__: proto
  });
}

ASchema.prototype = {
  /**
   * Validate values.
   * @param {object} values - Values to validate.
   * @param {object} [options] - Optional settings.
   * @returns {object|null} - Null if success.
   */

  validate: function validate(values, options) {
    options = options || {};
    var s = this;

    var _tv4$validateResult = tv4.validateResult(values, s);

    var valid = _tv4$validateResult.valid;
    var error = _tv4$validateResult.error;

    if (valid) {
      return null;
    }
    var code = error.code;
    var message = error.message;
    var params = error.params;
    var dataPath = error.dataPath;
    var schemaPath = error.schemaPath;

    return {
      id: uuid.v4(),
      code: code,
      title: message,
      detail: '' + JSON.stringify(params),
      source: {
        pointer: dataPath
      },
      meta: {
        tv4Error: { code: code, message: message, params: params, dataPath: dataPath, schemaPath: schemaPath },
        schema: s.toJSON()
      }
    };
  },

  /**
   * Create a clone instance.
   * @returns {ASchema}
   */
  clone: function clone() {
    var s = this;
    var schema = s.toJSON();
    return new ASchema(schema);
  },

  /**
   * Set values.
   * @param {object} values - Values to set
   * @returns {ASchema} - Returns self.
   */
  set: function set(values) {
    var s = this;
    if (arguments.length === 2) {
      values = {};
      var key = arguments[0];
      values[key] = arguments[1];
    }
    Object.assign(s, values);
    return s;
  },

  /**
   * Convert to json.
   * @returns {object} - JSON schema.
   */
  toJSON: function toJSON() {
    var s = this;
    var values = Object.assign({}, s);
    Object.keys(values).forEach(function (key) {
      var isFunc = iftype.isFunction(values[key]);
      if (isFunc) {
        delete values[key];
      }
    });
    return values;
  }
};

module.exports = ASchema;