/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

module.exports = function (node, indent) {
  let writer, str;
  writer = this.convert.bind(this);
  str = 'do' + this._ws + '{' + this._nl;
  str += doBody.call(this, writer, indent, node.body.children);
  str += indent + '}' + this._ws + 'while' + this._ws + '(' + writer(node.test, indent) + ')';
  return str;
};
