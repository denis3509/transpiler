/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer;

  if (!node.expr) {
    return 'return';
  }

  writer = this.convert.bind(this);
  return 'return ' + writer(node.expr, indent);
};
