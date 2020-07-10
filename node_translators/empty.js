/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer = this.convert.bind(this);
  return 'empty(' + writer(node.arguments[0], indent) + ')';
};
