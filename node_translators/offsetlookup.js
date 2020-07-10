/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer, offset;
  writer = this.convert.bind(this);
  offset = node.offset ? writer(node.offset, indent) : '';
  return writer(node.what, indent) + '[' + offset + ']';
};
