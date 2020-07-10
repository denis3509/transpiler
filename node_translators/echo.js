/*jslint node: true, indent: 2 */
'use strict';

const params = require('./helper/parameters');

module.exports = function (node, indent) {
  const str = params(node.expressions, indent, this);

  if (node.isInlineEcho) {
    return str + this._ws + '?>';
  }

  return 'echo ' + str;
};
