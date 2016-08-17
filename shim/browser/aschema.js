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
  s.__proto__ = Object.assign({}, schema, proto);
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

Object.assign(ASchema, { tv4: tv4 });

module.exports = ASchema;
//# sourceMappingURL=data:application/json;base64,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Q0EsVUFBSSxNQUFKLEVBQVk7QUFDVixlQUFPLE9BQVEsR0FBUixDQUFQO0FBQ0Q7QUFDRixLQUxEO0FBTUEsV0FBTyxNQUFQO0FBQ0Q7QUE3RWlCLENBQXBCOztBQWdGQSxPQUFPLE1BQVAsQ0FBYyxPQUFkLEVBQXVCLEVBQUUsUUFBRixFQUF2Qjs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsT0FBakIiLCJmaWxlIjoiYXNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiJsaWIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgc2NoZW1hIGluc3RhbmNlXG4gKiBAY2xhc3MgQVNjaGVtYVxuICovXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCB0djQgPSByZXF1aXJlKCd0djQnKVxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuY29uc3QgaWZ0eXBlID0gcmVxdWlyZSgnaWZ0eXBlJylcblxuLyoqIEBsZW5kcyBBU2NoZW1hICovXG5mdW5jdGlvbiBBU2NoZW1hIChzY2hlbWEpIHtcbiAgY29uc3QgcyA9IHRoaXNcbiAgc2NoZW1hID0gc2NoZW1hIHx8IHt9XG4gIC8vIG5vaW5zcGVjdGlvbiBFc2xpbnRcbiAgbGV0IHByb3RvID0gcy5fX3Byb3RvX19cbiAgcy5fX3Byb3RvX18gPSBPYmplY3QuYXNzaWduKHt9LCBzY2hlbWEsIHByb3RvKVxufVxuXG5BU2NoZW1hLnByb3RvdHlwZSA9IHtcbiAgLyoqXG4gICAqIFZhbGlkYXRlIHZhbHVlcy5cbiAgICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyAtIFZhbHVlcyB0byB2YWxpZGF0ZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbmFsIHNldHRpbmdzLlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fG51bGx9IC0gTnVsbCBpZiBzdWNjZXNzLlxuICAgKi9cbiAgdmFsaWRhdGUgKHZhbHVlcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyB2YWxpZCwgZXJyb3IgfSA9IHR2NC52YWxpZGF0ZVJlc3VsdCh2YWx1ZXMsIHMpXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBsZXQgeyBjb2RlLCBtZXNzYWdlLCBwYXJhbXMsIGRhdGFQYXRoLCBzY2hlbWFQYXRoIH0gPSBlcnJvclxuICAgIHJldHVybiB7XG4gICAgICBpZDogdXVpZC52NCgpLFxuICAgICAgY29kZSxcbiAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgZGV0YWlsOiBgJHtKU09OLnN0cmluZ2lmeShwYXJhbXMpfWAsXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgcG9pbnRlcjogZGF0YVBhdGhcbiAgICAgIH0sXG4gICAgICBtZXRhOiB7XG4gICAgICAgIHR2NEVycm9yOiB7IGNvZGUsIG1lc3NhZ2UsIHBhcmFtcywgZGF0YVBhdGgsIHNjaGVtYVBhdGggfSxcbiAgICAgICAgc2NoZW1hOiBzLnRvSlNPTigpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogVGhyb3cgYW4gZXJyb3IgaWYgdmFsaWRhdGUgZmFpbGVkXG4gICAqIEB0aHJvd3MgRXJyb3JcbiAgICovXG4gIHZhbGlkYXRlVG9UaHJvdyAoLi4uYXJncykge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IGVycm9yID0gcy52YWxpZGF0ZSguLi5hcmdzKVxuICAgIGlmIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjbG9uZSBpbnN0YW5jZS5cbiAgICogQHJldHVybnMge0FTY2hlbWF9XG4gICAqL1xuICBjbG9uZSAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgc2NoZW1hID0gcy50b0pTT04oKVxuICAgIHJldHVybiBuZXcgQVNjaGVtYShzY2hlbWEpXG4gIH0sXG4gIC8qKlxuICAgKiBTZXQgdmFsdWVzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIC0gVmFsdWVzIHRvIHNldFxuICAgKiBAcmV0dXJucyB7QVNjaGVtYX0gLSBSZXR1cm5zIHNlbGYuXG4gICAqL1xuICBzZXQgKHZhbHVlcykge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHZhbHVlcyA9IHt9XG4gICAgICBsZXQga2V5ID0gYXJndW1lbnRzWyAwIF1cbiAgICAgIHZhbHVlc1sga2V5IF0gPSBhcmd1bWVudHNbIDEgXVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKHMsIHZhbHVlcylcbiAgICByZXR1cm4gc1xuICB9LFxuICAvKipcbiAgICogQ29udmVydCB0byBqc29uLlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEpTT04gc2NoZW1hLlxuICAgKi9cbiAgdG9KU09OICgpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB2YWx1ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBzKVxuICAgIE9iamVjdC5rZXlzKHZhbHVlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBsZXQgaXNGdW5jID0gaWZ0eXBlLmlzRnVuY3Rpb24odmFsdWVzWyBrZXkgXSlcbiAgICAgIGlmIChpc0Z1bmMpIHtcbiAgICAgICAgZGVsZXRlIHZhbHVlc1sga2V5IF1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZXNcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEFTY2hlbWEsIHsgdHY0IH0pXG5cbm1vZHVsZS5leHBvcnRzID0gQVNjaGVtYVxuIl19