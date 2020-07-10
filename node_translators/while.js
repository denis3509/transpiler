/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

module.exports = function (node, indent) {
  let writer = this.convert.bind(this), str;

  str = 'while' + this._ws + '(' + writer(node.test, indent) + ')';
  if (!node.body) {
    return str;
  }
  if (node.shortForm) {
    str += ':' + this._nl;
  } else {
    str += this._ws + '{' + this._nl;
  }
  str += doBody.call(this, writer, indent, node.body.children || [node.body]);
  if (node.shortForm) {
    str += indent + 'endwhile;';
  } else {
    str += indent + '}';
  }
  return str;
};
