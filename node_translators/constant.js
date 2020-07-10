/*jslint node: true, indent: 2 */
'use strict';

/**
 * Constant declaration
 */
module.exports = function (node, indent) {
  let writer, str;
  writer = this.convert.bind(this);

  // a namespace constant (name, value)
  str = 'const ';
  str += node.name;
  str += this._ws + '=' + this._ws;
  str += writer(node.value, indent);

  return str;
};
