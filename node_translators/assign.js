/*jslint node: true, indent: 2 */
'use strict';


module.exports = function (node, indent) {
  let writer = this.convert.bind(this);

  return writer(node.left, indent) + this._ws + node.operator + this._ws + writer(node.right, indent);
};
