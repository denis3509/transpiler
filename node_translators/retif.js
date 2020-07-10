/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer, left, right = '';
  writer = this.convert.bind(this);
  if (node.trueExpr) {
    left = writer(node.trueExpr, indent);
  }
  if (node.falseExpr) {
    right = writer(node.falseExpr, indent);
  }
  return writer(node.test, indent) + this._ws + '?' +
    (left ? this._ws + left + this._ws : '') + ':' +
    (right ? this._ws + right : '');
};
