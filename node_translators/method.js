/*jslint node: true, indent: 2 */
'use strict';

const doBody = require('./helper/body');
const args = require('./helper/arguments');
const identifier = require('./helper/identifier');

// name, params, isRef, returnType, body, flags
module.exports = function (node, indent) {
  let writer, str = '';

  if (node.isAbstract) {
    str += 'abstract ';
  }
  if (node.isFinal) {
    str += 'final ';
  }
  if (node.isStatic) {
    str += 'static ';
  }
  // Fall back to public if nothing is specified
  if (!node.visibility) {
    node.visibility = 'public';
  }
  str += node.visibility + ' function ';
  if (node.byref) {
    str += '&';
  }
  writer = this.convert.bind(this);
  str += writer(node.name, indent);
  str += args(node.arguments, indent, this);

  // php7 / return type
  if (node.type) {
    str += this._ws + ':' + this._ws;
    if (node.nullable) {
      str += '?';
    }
    str += identifier(node.type);
  }

  // It lacks body. Must be an abstract method declaration.
  if (node.isAbstract || !node.body) {
    return str + ';';
  }


  if (this._options.bracketsNewLine) {
    str += this._nl + indent + '{' + this._nl;
  } else {
    str +=  this._ws + '{' + this._nl;
  }

  str += doBody.call(this, writer, indent, node.body.children);
  str += indent + '}';
  return str;
};
