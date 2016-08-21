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
    return Object.assign(new Error('Validation failed'), {
      name: 'SchemaError',
      errors: errors
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzY2hlbWEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0E7O0FBRUEsSUFBTSxNQUFNLFFBQVEsS0FBUixDQUFaO0FBQ0EsSUFBTSxPQUFPLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTSxTQUFTLFFBQVEsUUFBUixDQUFmOztBQUVBO0FBQ0EsU0FBUyxPQUFULENBQWtCLE1BQWxCLEVBQTBCO0FBQ3hCLE1BQU0sSUFBSSxJQUFWO0FBQ0EsV0FBUyxVQUFVLEVBQW5CO0FBQ0EsTUFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDakIsYUFBUyxPQUFPLE1BQVAsRUFBVDtBQUNEO0FBQ0Q7QUFOd0IsTUFPbEIsU0FQa0IsR0FPSixDQVBJLENBT2xCLFNBUGtCO0FBUXhCOztBQUNBLElBQUUsU0FBRixHQUFjLE9BQU8sTUFBUCxDQUFjLEVBQUUsY0FBRixFQUFkLEVBQTBCLE1BQTFCLEVBQWtDLFNBQWxDLENBQWQ7QUFDRDs7QUFFRCxRQUFRLFNBQVIsR0FBb0I7QUFDbEI7Ozs7OztBQU1BLFVBUGtCLG9CQU9SLE1BUFEsRUFPYztBQUFBLFFBQWQsT0FBYyx5REFBSixFQUFJOztBQUM5QixRQUFNLElBQUksSUFBVjs7QUFEOEIsZ0NBRU4sSUFBSSxnQkFBSixDQUFxQixNQUFyQixFQUE2QixDQUE3QixDQUZNOztBQUFBLFFBRXhCLEtBRndCLHlCQUV4QixLQUZ3QjtBQUFBLFFBRWpCLE1BRmlCLHlCQUVqQixNQUZpQjs7QUFHOUIsUUFBSSxLQUFKLEVBQVc7QUFDVCxhQUFPLElBQVA7QUFDRDtBQUNELFdBQU8sT0FBTyxNQUFQLENBQWMsSUFBSSxLQUFKLENBQVUsbUJBQVYsQ0FBZCxFQUE4QztBQUNuRCxZQUFNLGFBRDZDO0FBRW5EO0FBRm1ELEtBQTlDLENBQVA7QUFJRCxHQWpCaUI7O0FBa0JsQjs7OztBQUlBLGlCQXRCa0IsNkJBc0JRO0FBQ3hCLFFBQU0sSUFBSSxJQUFWO0FBQ0EsUUFBSSxRQUFRLEVBQUUsUUFBRixvQkFBWjtBQUNBLFFBQUksS0FBSixFQUFXO0FBQ1QsWUFBTSxLQUFOO0FBQ0Q7QUFDRixHQTVCaUI7O0FBNkJsQjs7OztBQUlBLE9BakNrQixtQkFpQ1Q7QUFDUCxRQUFNLElBQUksSUFBVjtBQUNBLFFBQUksU0FBUyxFQUFFLE1BQUYsRUFBYjtBQUNBLFdBQU8sSUFBSSxPQUFKLENBQVksTUFBWixDQUFQO0FBQ0QsR0FyQ2lCOztBQXNDbEI7Ozs7O0FBS0EsS0EzQ2tCLGVBMkNiLE1BM0NhLEVBMkNMO0FBQ1gsUUFBTSxJQUFJLElBQVY7QUFDQSxRQUFJLFVBQVUsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixlQUFTLEVBQVQ7QUFDQSxVQUFJLE1BQU0sVUFBVyxDQUFYLENBQVY7QUFDQSxhQUFRLEdBQVIsSUFBZ0IsVUFBVyxDQUFYLENBQWhCO0FBQ0Q7QUFDRCxXQUFPLE1BQVAsQ0FBYyxDQUFkLEVBQWlCLE1BQWpCO0FBQ0EsV0FBTyxDQUFQO0FBQ0QsR0FwRGlCOztBQXFEbEI7Ozs7QUFJQSxRQXpEa0Isb0JBeURSO0FBQ1IsUUFBTSxJQUFJLElBQVY7QUFDQSxRQUFJLFNBQVMsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixFQUFFLE1BQXBCLENBQWI7QUFDQSxXQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW9CLE9BQXBCLENBQTRCLFVBQUMsR0FBRCxFQUFTO0FBQ25DLFVBQUksU0FBUyxPQUFPLFVBQVAsQ0FBa0IsT0FBUSxHQUFSLENBQWxCLENBQWI7QUFDQSxVQUFJLE1BQUosRUFBWTtBQUNWLGVBQU8sT0FBUSxHQUFSLENBQVA7QUFDRDtBQUNGLEtBTEQ7QUFNQSxXQUFPLE1BQVA7QUFDRDtBQW5FaUIsQ0FBcEI7O0FBc0VBLE9BQU8sTUFBUCxDQUFjLE9BQWQsRUFBdUIsRUFBRSxRQUFGLEVBQXZCOztBQUVBLE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiJhc2NoZW1hLmpzIiwic291cmNlUm9vdCI6ImxpYiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBzY2hlbWEgaW5zdGFuY2VcbiAqIEBjbGFzcyBBU2NoZW1hXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHR2NCA9IHJlcXVpcmUoJ3R2NCcpXG5jb25zdCB1dWlkID0gcmVxdWlyZSgndXVpZCcpXG5jb25zdCBpZnR5cGUgPSByZXF1aXJlKCdpZnR5cGUnKVxuXG4vKiogQGxlbmRzIEFTY2hlbWEgKi9cbmZ1bmN0aW9uIEFTY2hlbWEgKHNjaGVtYSkge1xuICBjb25zdCBzID0gdGhpc1xuICBzY2hlbWEgPSBzY2hlbWEgfHwge31cbiAgaWYgKHNjaGVtYS50b0pTT04pIHtcbiAgICBzY2hlbWEgPSBzY2hlbWEudG9KU09OKClcbiAgfVxuICAvLyBub2luc3BlY3Rpb24gRXNsaW50XG4gIGxldCB7IF9fcHJvdG9fXyB9ID0gc1xuICAvLyBub2luc3BlY3Rpb24gRXNsaW50XG4gIHMuX19wcm90b19fID0gT2JqZWN0LmFzc2lnbih7IHNjaGVtYSB9LCBzY2hlbWEsIF9fcHJvdG9fXylcbn1cblxuQVNjaGVtYS5wcm90b3R5cGUgPSB7XG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgLSBWYWx1ZXMgdG8gdmFsaWRhdGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25hbCBzZXR0aW5ncy5cbiAgICogQHJldHVybnMge29iamVjdHxudWxsfSAtIE51bGwgaWYgc3VjY2Vzcy5cbiAgICovXG4gIHZhbGlkYXRlICh2YWx1ZXMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgdmFsaWQsIGVycm9ycyB9ID0gdHY0LnZhbGlkYXRlTXVsdGlwbGUodmFsdWVzLCBzKVxuICAgIGlmICh2YWxpZCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IEVycm9yKCdWYWxpZGF0aW9uIGZhaWxlZCcpLCB7XG4gICAgICBuYW1lOiAnU2NoZW1hRXJyb3InLFxuICAgICAgZXJyb3JzXG4gICAgfSlcbiAgfSxcbiAgLyoqXG4gICAqIFRocm93IGFuIGVycm9yIGlmIHZhbGlkYXRlIGZhaWxlZFxuICAgKiBAdGhyb3dzIEVycm9yXG4gICAqL1xuICB2YWxpZGF0ZVRvVGhyb3cgKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCBlcnJvciA9IHMudmFsaWRhdGUoLi4uYXJncylcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9LFxuICAvKipcbiAgICogQ3JlYXRlIGEgY2xvbmUgaW5zdGFuY2UuXG4gICAqIEByZXR1cm5zIHtBU2NoZW1hfVxuICAgKi9cbiAgY2xvbmUgKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHNjaGVtYSA9IHMudG9KU09OKClcbiAgICByZXR1cm4gbmV3IEFTY2hlbWEoc2NoZW1hKVxuICB9LFxuICAvKipcbiAgICogU2V0IHZhbHVlcy5cbiAgICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyAtIFZhbHVlcyB0byBzZXRcbiAgICogQHJldHVybnMge0FTY2hlbWF9IC0gUmV0dXJucyBzZWxmLlxuICAgKi9cbiAgc2V0ICh2YWx1ZXMpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICB2YWx1ZXMgPSB7fVxuICAgICAgbGV0IGtleSA9IGFyZ3VtZW50c1sgMCBdXG4gICAgICB2YWx1ZXNbIGtleSBdID0gYXJndW1lbnRzWyAxIF1cbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihzLCB2YWx1ZXMpXG4gICAgcmV0dXJuIHNcbiAgfSxcbiAgLyoqXG4gICAqIENvbnZlcnQgdG8ganNvbi5cbiAgICogQHJldHVybnMge29iamVjdH0gLSBKU09OIHNjaGVtYS5cbiAgICovXG4gIHRvSlNPTiAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgcy5zY2hlbWEpXG4gICAgT2JqZWN0LmtleXModmFsdWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGxldCBpc0Z1bmMgPSBpZnR5cGUuaXNGdW5jdGlvbih2YWx1ZXNbIGtleSBdKVxuICAgICAgaWYgKGlzRnVuYykge1xuICAgICAgICBkZWxldGUgdmFsdWVzWyBrZXkgXVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlc1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oQVNjaGVtYSwgeyB0djQgfSlcblxubW9kdWxlLmV4cG9ydHMgPSBBU2NoZW1hXG4iXX0=