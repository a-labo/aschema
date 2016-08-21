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
  if (schema.toJSON) {
    schema = schema.toJSON();
  }
  // noinspection Eslint
  var __proto__ = s.__proto__;
  // noinspection Eslint

  s.__proto__ = Object.assign({ schema: schema }, schema, __proto__);
}

ASchema.prototype = {
  /**
   * Validate values.
   * @param {object} values - Values to validate.
   * @param {object} [options] - Optional settings.
   * @returns {object|null} - Null if success.
   */
  validate: function validate(values) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var s = this;

    var _tv4$validateMultiple = tv4.validateMultiple(values, s);

    var valid = _tv4$validateMultiple.valid;
    var errors = _tv4$validateMultiple.errors;

    if (valid) {
      return null;
    }
    var assign = options.assign;
    var _options$name = options.name;
    var name = _options$name === undefined ? 'SchemaError' : _options$name;

    return Object.assign(new Error('Validation failed'), {
      name: name,
      errors: errors
    }, assign);
  },

  /**
   * Throw an error if validate failed
   * @throws Error
   */
  validateToThrow: function validateToThrow() {
    var s = this;
    var error = s.validate.apply(s, arguments);
    if (error) {
      throw error;
    }
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
    var values = Object.assign({}, s.schema);
    Object.keys(values).forEach(function (key) {
      var isFunc = iftype.isFunction(values[key]);
      if (isFunc) {
        delete values[key];
      }
    });
    return values;
  }
};

Object.assign(ASchema, { tv4: tv4 });

module.exports = ASchema;
//# sourceMappingURL=data:application/json;base64,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RUEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCIiwiZmlsZSI6ImFzY2hlbWEuanMiLCJzb3VyY2VSb290IjoibGliIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIHNjaGVtYSBpbnN0YW5jZVxuICogQGNsYXNzIEFTY2hlbWFcbiAqL1xuXG4ndXNlIHN0cmljdCdcblxuY29uc3QgdHY0ID0gcmVxdWlyZSgndHY0JylcbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IGlmdHlwZSA9IHJlcXVpcmUoJ2lmdHlwZScpXG5cbi8qKiBAbGVuZHMgQVNjaGVtYSAqL1xuZnVuY3Rpb24gQVNjaGVtYSAoc2NoZW1hKSB7XG4gIGNvbnN0IHMgPSB0aGlzXG4gIHNjaGVtYSA9IHNjaGVtYSB8fCB7fVxuICBpZiAoc2NoZW1hLnRvSlNPTikge1xuICAgIHNjaGVtYSA9IHNjaGVtYS50b0pTT04oKVxuICB9XG4gIC8vIG5vaW5zcGVjdGlvbiBFc2xpbnRcbiAgbGV0IHsgX19wcm90b19fIH0gPSBzXG4gIC8vIG5vaW5zcGVjdGlvbiBFc2xpbnRcbiAgcy5fX3Byb3RvX18gPSBPYmplY3QuYXNzaWduKHsgc2NoZW1hIH0sIHNjaGVtYSwgX19wcm90b19fKVxufVxuXG5BU2NoZW1hLnByb3RvdHlwZSA9IHtcbiAgLyoqXG4gICAqIFZhbGlkYXRlIHZhbHVlcy5cbiAgICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyAtIFZhbHVlcyB0byB2YWxpZGF0ZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbmFsIHNldHRpbmdzLlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fG51bGx9IC0gTnVsbCBpZiBzdWNjZXNzLlxuICAgKi9cbiAgdmFsaWRhdGUgKHZhbHVlcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyB2YWxpZCwgZXJyb3JzIH0gPSB0djQudmFsaWRhdGVNdWx0aXBsZSh2YWx1ZXMsIHMpXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBsZXQge1xuICAgICAgYXNzaWduLFxuICAgICAgbmFtZSA9ICdTY2hlbWFFcnJvcidcbiAgICB9ID0gb3B0aW9uc1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBFcnJvcignVmFsaWRhdGlvbiBmYWlsZWQnKSwge1xuICAgICAgbmFtZSxcbiAgICAgIGVycm9yc1xuICAgIH0sIGFzc2lnbilcbiAgfSxcbiAgLyoqXG4gICAqIFRocm93IGFuIGVycm9yIGlmIHZhbGlkYXRlIGZhaWxlZFxuICAgKiBAdGhyb3dzIEVycm9yXG4gICAqL1xuICB2YWxpZGF0ZVRvVGhyb3cgKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCBlcnJvciA9IHMudmFsaWRhdGUoLi4uYXJncylcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9LFxuICAvKipcbiAgICogQ3JlYXRlIGEgY2xvbmUgaW5zdGFuY2UuXG4gICAqIEByZXR1cm5zIHtBU2NoZW1hfVxuICAgKi9cbiAgY2xvbmUgKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHNjaGVtYSA9IHMudG9KU09OKClcbiAgICByZXR1cm4gbmV3IEFTY2hlbWEoc2NoZW1hKVxuICB9LFxuICAvKipcbiAgICogU2V0IHZhbHVlcy5cbiAgICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyAtIFZhbHVlcyB0byBzZXRcbiAgICogQHJldHVybnMge0FTY2hlbWF9IC0gUmV0dXJucyBzZWxmLlxuICAgKi9cbiAgc2V0ICh2YWx1ZXMpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICB2YWx1ZXMgPSB7fVxuICAgICAgbGV0IGtleSA9IGFyZ3VtZW50c1sgMCBdXG4gICAgICB2YWx1ZXNbIGtleSBdID0gYXJndW1lbnRzWyAxIF1cbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihzLCB2YWx1ZXMpXG4gICAgcmV0dXJuIHNcbiAgfSxcbiAgLyoqXG4gICAqIENvbnZlcnQgdG8ganNvbi5cbiAgICogQHJldHVybnMge29iamVjdH0gLSBKU09OIHNjaGVtYS5cbiAgICovXG4gIHRvSlNPTiAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgcy5zY2hlbWEpXG4gICAgT2JqZWN0LmtleXModmFsdWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGxldCBpc0Z1bmMgPSBpZnR5cGUuaXNGdW5jdGlvbih2YWx1ZXNbIGtleSBdKVxuICAgICAgaWYgKGlzRnVuYykge1xuICAgICAgICBkZWxldGUgdmFsdWVzWyBrZXkgXVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlc1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oQVNjaGVtYSwgeyB0djQgfSlcblxubW9kdWxlLmV4cG9ydHMgPSBBU2NoZW1hXG4iXX0=