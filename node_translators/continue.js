/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer = this.convert.bind(this);
  if (node.level) {
    return 'continue ' + writer(node.level, indent);
  }

  return 'continue';
};
