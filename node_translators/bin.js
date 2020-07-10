/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer, str, firstpart, secondpart;
  writer = this.convert.bind(this);

  firstpart = writer(node.left, indent);
  secondpart = writer(node.right, indent);
  str = firstpart + this._ws + node.type + this._ws + secondpart;

  if (str.length > 80) {
    str = firstpart + this._ws + node.type + this._nl + indent + this._indent + secondpart;
  }

  return str;
};
