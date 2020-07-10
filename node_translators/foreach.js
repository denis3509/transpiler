/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

module.exports = function (node, indent) {
  let writer, str;
  writer = this.convert.bind(this);

  str = 'foreach' + this._ws + '(' + writer(node.source, indent) + this._ws + 'as' + this._ws;
  if (node.key) {
    str += writer(node.key, indent) + this._ws + '=>' + this._ws;
  }
  str += writer(node.value, indent) + ')';
  if (node.shortForm) {
    str += ':' + this._nl;
  } else {
    str += this._ws + '{' + this._nl;
  }

  str += doBody.call(this, writer, indent, node.body.children || [node.body]);
  if (node.shortForm) {
    str += indent + 'endforeach;';
  } else {
    str += indent + '}';
  }
  return str;
};
