/*jslint node: true, indent: 2 */
'use strict';
let params = require('./helper/parameters');

module.exports = function (node, indent) {
  let writer, str;
  writer = this.convert.bind(this);
  str = writer(node.what, indent);
  if (node.what.kind !== 'class') {
    str += '(';
    if (node.arguments && node.arguments.length > 0) {
      str += params(node.arguments, indent, this);
    }
    str += ')';
  }
  return 'new ' + str;
};
