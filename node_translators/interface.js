/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');
let identifier = require('./helper/identifier');

module.exports = function (node, indent) {
  let writer, str = '';
  writer = this.convert.bind(this);

  // Start
  if (node.isFinal) {
    str = 'final ';
  }
  str += 'interface ' + node.name;

  if (node.extends) {
    str += ' extends ' + node.extends.map(identifier).join(',' + this._ws);
  }

  // begin curly brace
  if (this._options.bracketsNewLine) {
    str += this._nl + indent + '{' + this._nl;
  } else {
    str += this._ws + '{' + this._nl;
  }

  // interface body
  str += doBody.call(this, writer, indent, node.body);

  // end curly brace
  str += indent + '}\n';

  return str;
};
