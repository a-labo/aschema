/**
 * Create a schema instance
 * @function create
 * @returns {ASchema} - Schema instnace
 */
'use strict';

var ASchema = require('./aschema');

/** @lends create */
function create() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(ASchema, [null].concat(args)))();
}

module.exports = create;
//# sourceMappingURL=data:application/json;base64,bnVsbA==