/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  let str;

  str = node.omitClosingTag ? '' : '?>';
  str += node.value;

  if (node.isInlineEcho) {
    return str + '<?=' + this._ws;
  }

  return str + (node.isLast ? '' : '<?php' + this._nl);
};
