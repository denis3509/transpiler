/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

// block
module.exports = function (node, indent) {
  let writer, str = '';
  writer = this.convert.bind(this);

  str += this._nl + indent + '{' + this._nl;
  str += doBody.call(this, writer, indent, node.children);
  str += indent + '}' + this._nl;

  return str;
};
