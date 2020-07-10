/*jslint node: true, indent: 2 */
'use strict';
let doBody = require('./helper/body');
let identifier = require('./helper/identifier');

module.exports = function (node, indent) {
  let writer, str;
  writer = this.convert.bind(this);

  str = 'trait ' + node.name;

  if (node.extends) {
    str += ' extends ' + identifier(node.extends);
  }

  if (node.implements) {
    str += ' implements ' + node.implements.map(identifier).join(',' + this._ws);
  }

  // begin curly brace
  if (this._options.bracketsNewLine) {
    str += this._nl + indent + '{' + this._nl;
  } else {
    str += this._ws + '{' + this._nl;
  }

  // trait body
  str += doBody.call(this, writer, indent, node.body);

  // end curly brace
  str += indent + '}\n';

  return str;
};
