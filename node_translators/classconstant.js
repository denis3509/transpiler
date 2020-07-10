/*jslint node: true, indent: 2 */
'use strict';

/**
 * Constant declaration
 */
module.exports = function (node, indent) {
  let writer, str = '';
  writer = this.convert.bind(this);
  if (node.visibility) {
    str += node.visibility + ' ';
  }
  str += 'const ';
  str += node.name;
  if (node.value) {
    str += this._ws + '=' + this._ws;
    str += writer(node.value, indent);
  }
  return str;
};
