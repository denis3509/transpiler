/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let str, writer;
  str = node.require ? 'require' : 'include';
  if (node.once) {
    str += '_once';
  }
  writer = this.convert.bind(this);
  return str + ' ' + writer(node.target, indent);
};
