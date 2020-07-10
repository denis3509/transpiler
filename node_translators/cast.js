/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer;
  writer = this.convert.bind(this);
  return '(' + node.type + ')' + writer(node.what, indent);
};
