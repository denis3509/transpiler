/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer, str;
  str = 'yield';
  if (node.value) {
    writer = this.convert.bind(this);
    if (node.key) {
      // yield $key => $value
      str += ' ' + writer(node.key, indent) + ' =>';
    }
    // yield $value
    str += ' ' + writer(node.value, indent);
  }
  return str;
};
