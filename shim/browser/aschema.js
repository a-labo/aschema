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
    var _s$schema = s.schema;
    var schema = _s$schema === undefined ? {} : _s$schema;

    var error = new Error('Validation failed with schema: ' + (schema.title || schema.id || schema.description));
    return Object.assign(error, {
      id: uuid.v4(),
      name: name,
      errors: errors,
      schema: schema,
      values: values,
      engine: 'tv4'
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
//# sourceMappingURL=data:application/json;base64,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U0FBUyxPQUFPLFVBQVAsQ0FBa0IsT0FBUSxHQUFSLENBQWxCLENBQWI7QUFDQSxVQUFJLE1BQUosRUFBWTtBQUNWLGVBQU8sT0FBUSxHQUFSLENBQVA7QUFDRDtBQUNGLEtBTEQ7QUFNQSxXQUFPLE1BQVA7QUFDRDtBQS9FaUIsQ0FBcEI7O0FBa0ZBLE9BQU8sTUFBUCxDQUFjLE9BQWQsRUFBdUIsRUFBRSxRQUFGLEVBQXZCOztBQUVBLE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiJhc2NoZW1hLmpzIiwic291cmNlUm9vdCI6ImxpYiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBzY2hlbWEgaW5zdGFuY2VcbiAqIEBjbGFzcyBBU2NoZW1hXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHR2NCA9IHJlcXVpcmUoJ3R2NCcpXG5jb25zdCB1dWlkID0gcmVxdWlyZSgndXVpZCcpXG5jb25zdCBpZnR5cGUgPSByZXF1aXJlKCdpZnR5cGUnKVxuXG4vKiogQGxlbmRzIEFTY2hlbWEgKi9cbmZ1bmN0aW9uIEFTY2hlbWEgKHNjaGVtYSkge1xuICBjb25zdCBzID0gdGhpc1xuICBzY2hlbWEgPSBzY2hlbWEgfHwge31cbiAgaWYgKHNjaGVtYS50b0pTT04pIHtcbiAgICBzY2hlbWEgPSBzY2hlbWEudG9KU09OKClcbiAgfVxuICAvLyBub2luc3BlY3Rpb24gRXNsaW50XG4gIGxldCB7IF9fcHJvdG9fXyB9ID0gc1xuICAvLyBub2luc3BlY3Rpb24gRXNsaW50XG4gIHMuX19wcm90b19fID0gT2JqZWN0LmFzc2lnbih7IHNjaGVtYSB9LCBzY2hlbWEsIF9fcHJvdG9fXylcbn1cblxuQVNjaGVtYS5wcm90b3R5cGUgPSB7XG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgLSBWYWx1ZXMgdG8gdmFsaWRhdGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25hbCBzZXR0aW5ncy5cbiAgICogQHJldHVybnMge29iamVjdHxudWxsfSAtIE51bGwgaWYgc3VjY2Vzcy5cbiAgICovXG4gIHZhbGlkYXRlICh2YWx1ZXMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgdmFsaWQsIGVycm9ycyB9ID0gdHY0LnZhbGlkYXRlTXVsdGlwbGUodmFsdWVzLCBzKVxuICAgIGlmICh2YWxpZCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgbGV0IHtcbiAgICAgIGFzc2lnbixcbiAgICAgIG5hbWUgPSAnU2NoZW1hRXJyb3InXG4gICAgfSA9IG9wdGlvbnNcbiAgICBsZXQgeyBzY2hlbWEgPSB7fSB9ID0gc1xuICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgIGBWYWxpZGF0aW9uIGZhaWxlZCB3aXRoIHNjaGVtYTogJHtzY2hlbWEudGl0bGUgfHwgc2NoZW1hLmlkIHx8IHNjaGVtYS5kZXNjcmlwdGlvbn1gXG4gICAgKVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGVycm9yLCB7XG4gICAgICBpZDogdXVpZC52NCgpLFxuICAgICAgbmFtZSxcbiAgICAgIGVycm9ycyxcbiAgICAgIHNjaGVtYSxcbiAgICAgIHZhbHVlcyxcbiAgICAgIGVuZ2luZTogJ3R2NCdcbiAgICB9LCBhc3NpZ24pXG4gIH0sXG4gIC8qKlxuICAgKiBUaHJvdyBhbiBlcnJvciBpZiB2YWxpZGF0ZSBmYWlsZWRcbiAgICogQHRocm93cyBFcnJvclxuICAgKi9cbiAgdmFsaWRhdGVUb1Rocm93ICguLi5hcmdzKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgZXJyb3IgPSBzLnZhbGlkYXRlKC4uLmFyZ3MpXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNsb25lIGluc3RhbmNlLlxuICAgKiBAcmV0dXJucyB7QVNjaGVtYX1cbiAgICovXG4gIGNsb25lICgpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCBzY2hlbWEgPSBzLnRvSlNPTigpXG4gICAgcmV0dXJuIG5ldyBBU2NoZW1hKHNjaGVtYSlcbiAgfSxcbiAgLyoqXG4gICAqIFNldCB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgLSBWYWx1ZXMgdG8gc2V0XG4gICAqIEByZXR1cm5zIHtBU2NoZW1hfSAtIFJldHVybnMgc2VsZi5cbiAgICovXG4gIHNldCAodmFsdWVzKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgdmFsdWVzID0ge31cbiAgICAgIGxldCBrZXkgPSBhcmd1bWVudHNbIDAgXVxuICAgICAgdmFsdWVzWyBrZXkgXSA9IGFyZ3VtZW50c1sgMSBdXG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24ocywgdmFsdWVzKVxuICAgIHJldHVybiBzXG4gIH0sXG4gIC8qKlxuICAgKiBDb252ZXJ0IHRvIGpzb24uXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gSlNPTiBzY2hlbWEuXG4gICAqL1xuICB0b0pTT04gKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHZhbHVlcyA9IE9iamVjdC5hc3NpZ24oe30sIHMuc2NoZW1hKVxuICAgIE9iamVjdC5rZXlzKHZhbHVlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBsZXQgaXNGdW5jID0gaWZ0eXBlLmlzRnVuY3Rpb24odmFsdWVzWyBrZXkgXSlcbiAgICAgIGlmIChpc0Z1bmMpIHtcbiAgICAgICAgZGVsZXRlIHZhbHVlc1sga2V5IF1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZXNcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEFTY2hlbWEsIHsgdHY0IH0pXG5cbm1vZHVsZS5leHBvcnRzID0gQVNjaGVtYVxuIl19