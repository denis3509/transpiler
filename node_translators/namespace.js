/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

module.exports = function (node, indent) {
  let str, writer;

  str = 'namespace ' + node.name + this._ws + '\n{\n\n';
  writer = this.convert.bind(this);
  str += doBody.call(this, writer, indent, node.children);
  str += '}';

  return str;
};
