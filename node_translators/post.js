/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer = this.convert.bind(this);
  return writer(node.what, indent) + node.type + node.type;
};
