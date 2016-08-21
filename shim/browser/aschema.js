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
  var __proto__ = s.__proto__;
  // noinspection Eslint

  s.__proto__ = Object.assign({}, schema, __proto__);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzY2hlbWEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0E7O0FBRUEsSUFBTSxNQUFNLFFBQVEsS0FBUixDQUFaO0FBQ0EsSUFBTSxPQUFPLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTSxTQUFTLFFBQVEsUUFBUixDQUFmOztBQUVBO0FBQ0EsU0FBUyxPQUFULENBQWtCLE1BQWxCLEVBQTBCO0FBQ3hCLE1BQU0sSUFBSSxJQUFWO0FBQ0EsV0FBUyxVQUFVLEVBQW5CO0FBQ0E7QUFId0IsTUFJbEIsU0FKa0IsR0FJSixDQUpJLENBSWxCLFNBSmtCO0FBS3hCOztBQUNBLElBQUUsU0FBRixHQUFjLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsTUFBbEIsRUFBMEIsU0FBMUIsQ0FBZDtBQUNEOztBQUVELFFBQVEsU0FBUixHQUFvQjtBQUNsQjs7Ozs7O0FBTUEsVUFQa0Isb0JBT1IsTUFQUSxFQU9jO0FBQUEsUUFBZCxPQUFjLHlEQUFKLEVBQUk7O0FBQzlCLFFBQU0sSUFBSSxJQUFWOztBQUQ4QixnQ0FFTixJQUFJLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLENBQTdCLENBRk07O0FBQUEsUUFFeEIsS0FGd0IseUJBRXhCLEtBRndCO0FBQUEsUUFFakIsTUFGaUIseUJBRWpCLE1BRmlCOztBQUc5QixRQUFJLEtBQUosRUFBVztBQUNULGFBQU8sSUFBUDtBQUNEO0FBQ0QsV0FBTyxPQUFPLE1BQVAsQ0FBYyxJQUFJLEtBQUosQ0FBVSxtQkFBVixDQUFkLEVBQThDO0FBQ25ELFlBQU0sYUFENkM7QUFFbkQ7QUFGbUQsS0FBOUMsQ0FBUDtBQUlELEdBakJpQjs7QUFrQmxCOzs7O0FBSUEsaUJBdEJrQiw2QkFzQlE7QUFDeEIsUUFBTSxJQUFJLElBQVY7QUFDQSxRQUFJLFFBQVEsRUFBRSxRQUFGLG9CQUFaO0FBQ0EsUUFBSSxLQUFKLEVBQVc7QUFDVCxZQUFNLEtBQU47QUFDRDtBQUNGLEdBNUJpQjs7QUE2QmxCOzs7O0FBSUEsT0FqQ2tCLG1CQWlDVDtBQUNQLFFBQU0sSUFBSSxJQUFWO0FBQ0EsUUFBSSxTQUFTLEVBQUUsTUFBRixFQUFiO0FBQ0EsV0FBTyxJQUFJLE9BQUosQ0FBWSxNQUFaLENBQVA7QUFDRCxHQXJDaUI7O0FBc0NsQjs7Ozs7QUFLQSxLQTNDa0IsZUEyQ2IsTUEzQ2EsRUEyQ0w7QUFDWCxRQUFNLElBQUksSUFBVjtBQUNBLFFBQUksVUFBVSxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCLGVBQVMsRUFBVDtBQUNBLFVBQUksTUFBTSxVQUFXLENBQVgsQ0FBVjtBQUNBLGFBQVEsR0FBUixJQUFnQixVQUFXLENBQVgsQ0FBaEI7QUFDRDtBQUNELFdBQU8sTUFBUCxDQUFjLENBQWQsRUFBaUIsTUFBakI7QUFDQSxXQUFPLENBQVA7QUFDRCxHQXBEaUI7O0FBcURsQjs7OztBQUlBLFFBekRrQixvQkF5RFI7QUFDUixRQUFNLElBQUksSUFBVjtBQUNBLFFBQUksU0FBUyxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLENBQWxCLENBQWI7QUFDQSxXQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW9CLE9BQXBCLENBQTRCLFVBQUMsR0FBRCxFQUFTO0FBQ25DLFVBQUksU0FBUyxPQUFPLFVBQVAsQ0FBa0IsT0FBUSxHQUFSLENBQWxCLENBQWI7QUFDQSxVQUFJLE1BQUosRUFBWTtBQUNWLGVBQU8sT0FBUSxHQUFSLENBQVA7QUFDRDtBQUNGLEtBTEQ7QUFNQSxXQUFPLE1BQVA7QUFDRDtBQW5FaUIsQ0FBcEI7O0FBc0VBLE9BQU8sTUFBUCxDQUFjLE9BQWQsRUFBdUIsRUFBRSxRQUFGLEVBQXZCOztBQUVBLE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiJhc2NoZW1hLmpzIiwic291cmNlUm9vdCI6ImxpYiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBzY2hlbWEgaW5zdGFuY2VcbiAqIEBjbGFzcyBBU2NoZW1hXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHR2NCA9IHJlcXVpcmUoJ3R2NCcpXG5jb25zdCB1dWlkID0gcmVxdWlyZSgndXVpZCcpXG5jb25zdCBpZnR5cGUgPSByZXF1aXJlKCdpZnR5cGUnKVxuXG4vKiogQGxlbmRzIEFTY2hlbWEgKi9cbmZ1bmN0aW9uIEFTY2hlbWEgKHNjaGVtYSkge1xuICBjb25zdCBzID0gdGhpc1xuICBzY2hlbWEgPSBzY2hlbWEgfHwge31cbiAgLy8gbm9pbnNwZWN0aW9uIEVzbGludFxuICBsZXQgeyBfX3Byb3RvX18gfSA9IHNcbiAgLy8gbm9pbnNwZWN0aW9uIEVzbGludFxuICBzLl9fcHJvdG9fXyA9IE9iamVjdC5hc3NpZ24oe30sIHNjaGVtYSwgX19wcm90b19fKVxufVxuXG5BU2NoZW1hLnByb3RvdHlwZSA9IHtcbiAgLyoqXG4gICAqIFZhbGlkYXRlIHZhbHVlcy5cbiAgICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyAtIFZhbHVlcyB0byB2YWxpZGF0ZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbmFsIHNldHRpbmdzLlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fG51bGx9IC0gTnVsbCBpZiBzdWNjZXNzLlxuICAgKi9cbiAgdmFsaWRhdGUgKHZhbHVlcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyB2YWxpZCwgZXJyb3JzIH0gPSB0djQudmFsaWRhdGVNdWx0aXBsZSh2YWx1ZXMsIHMpXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoJ1ZhbGlkYXRpb24gZmFpbGVkJyksIHtcbiAgICAgIG5hbWU6ICdTY2hlbWFFcnJvcicsXG4gICAgICBlcnJvcnNcbiAgICB9KVxuICB9LFxuICAvKipcbiAgICogVGhyb3cgYW4gZXJyb3IgaWYgdmFsaWRhdGUgZmFpbGVkXG4gICAqIEB0aHJvd3MgRXJyb3JcbiAgICovXG4gIHZhbGlkYXRlVG9UaHJvdyAoLi4uYXJncykge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IGVycm9yID0gcy52YWxpZGF0ZSguLi5hcmdzKVxuICAgIGlmIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjbG9uZSBpbnN0YW5jZS5cbiAgICogQHJldHVybnMge0FTY2hlbWF9XG4gICAqL1xuICBjbG9uZSAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgc2NoZW1hID0gcy50b0pTT04oKVxuICAgIHJldHVybiBuZXcgQVNjaGVtYShzY2hlbWEpXG4gIH0sXG4gIC8qKlxuICAgKiBTZXQgdmFsdWVzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIC0gVmFsdWVzIHRvIHNldFxuICAgKiBAcmV0dXJucyB7QVNjaGVtYX0gLSBSZXR1cm5zIHNlbGYuXG4gICAqL1xuICBzZXQgKHZhbHVlcykge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHZhbHVlcyA9IHt9XG4gICAgICBsZXQga2V5ID0gYXJndW1lbnRzWyAwIF1cbiAgICAgIHZhbHVlc1sga2V5IF0gPSBhcmd1bWVudHNbIDEgXVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKHMsIHZhbHVlcylcbiAgICByZXR1cm4gc1xuICB9LFxuICAvKipcbiAgICogQ29udmVydCB0byBqc29uLlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEpTT04gc2NoZW1hLlxuICAgKi9cbiAgdG9KU09OICgpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB2YWx1ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBzKVxuICAgIE9iamVjdC5rZXlzKHZhbHVlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBsZXQgaXNGdW5jID0gaWZ0eXBlLmlzRnVuY3Rpb24odmFsdWVzWyBrZXkgXSlcbiAgICAgIGlmIChpc0Z1bmMpIHtcbiAgICAgICAgZGVsZXRlIHZhbHVlc1sga2V5IF1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZXNcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEFTY2hlbWEsIHsgdHY0IH0pXG5cbm1vZHVsZS5leHBvcnRzID0gQVNjaGVtYVxuIl19