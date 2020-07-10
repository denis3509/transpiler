/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  if (typeof node.name !== 'string') {
    let writer = this.convert.bind(this);
    node.name = writer(node.name, indent);
  }
  return (node.byref ? '&$' : '$') + node.name;
};
