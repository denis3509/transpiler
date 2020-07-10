/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');
let args = require('./helper/arguments');
let identifier = require('./helper/identifier');

// params, isRef, use, returnType
module.exports = function (node, indent) {
  let writer, str, useArgs;
  writer = this.convert.bind(this);

  // function header
  str = 'function' + this._ws;
  if (node.byref) {
    str += '&';
  }
  str += args(node.arguments, indent, this);

  // use statement
  if (node.uses && node.uses.length > 0) {
    useArgs = node.uses.map(function (arg) {
      return '$' + arg.name;
    });
    str += this._ws + 'use' + this._ws + '(' + useArgs.join(',' + this._ws) + ')';
  }

  // php7 / return type
  if (node.type) {
    str += this._ws + ':' + this._ws;
    if (node.nullable) {
      str += '?';
    }
    str += identifier(node.type);
  }

  str += this._ws + '{' + this._nl;
  str += doBody.call(this, writer, indent, node.body.children);
  str += indent + '}';
  return str;
};
