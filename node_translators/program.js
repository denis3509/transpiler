/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

module.exports = function (node) {

  if (!node.children || node.children.length === 0) {
    return '';
  }

  let writer = this.convert.bind(this), str = '<?php' + this._nl;
  if (node.children[0].kind === 'inline') {
    str = '';
    node.children[0].omitClosingTag = true;
  }
  // Is the last expression and an inline
  if (node.children[node.children.length - 1].kind === 'inline') {
    node.children[node.children.length - 1].isLast = true;
  }
  if (
    !this._forceNamespaceBrackets &&
      node.children.length === 1 &&
      node.children[0].kind === 'namespace'
  ) {
    return str + 'namespace ' + node.children[0].name + ';' +
      this._nl + this._nl +
      doBody.call(this, writer, '', node.children[0].children, true);
  }
  return str + doBody.call(this, writer, '', node.children, true) + this._nl + '?>';
};
