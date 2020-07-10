/*jslint node: true, indent: 2 */
'use strict';

/**
 * Exit statement
 */
module.exports = function (node, indent) {
  let writer;
  writer = this.convert.bind(this);
  if (node.status === null) {
    return 'exit';
  }
  return 'exit(' + writer(node.status, indent) + ')';
};
