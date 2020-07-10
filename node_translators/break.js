/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  if (node.level) {
    let writer = this.convert.bind(this);
    return 'break ' + writer(node.level, indent);
  }
  return 'break';
};
