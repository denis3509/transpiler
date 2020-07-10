/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');
let args = require('./helper/arguments');
let identifier = require('./helper/identifier');

// name, params, isRef, returnType, body
module.exports = function (node, indent) {
  let writer, str;
  writer = this.convert.bind(this);

  str = 'function ';
  if (node.byref) {
    str += '&';
  }
  str += node.name;
  str += args(node.arguments, indent, this);

  // php7 / return type
  if (node.type) {
    str += this._ws + ':' + this._ws;
    if (node.nullable) {
      str += '?';
    }
    str += identifier(node.type);
  }

  if (this._options.bracketsNewLine) {
    str += this._nl + indent + '{' + this._nl;
  } else {
    str += this._ws + '{' + this._nl;
  }

  str += doBody.call(this, writer, indent, node.body.children);
  str += indent + '}' + this._nl;

  return str;
};
