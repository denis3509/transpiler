/*jslint node: true, indent: 2, unparam:true */
'use strict';

module.exports = function (node, indent, opt) {
  let body = '', writer = this.convert.bind(this);

  node.value.forEach(function (item) {
    if (item.kind === 'string') {
      body += item.value;
    } else {
      body += '{' + writer(item, indent) + '}';
    }
  });

  if (node.type === 'heredoc') {
    return '<<<' + node.label + this._nl + body + node.label;
  }

  if (node.type === 'nowdoc') {
    return '<<<\'' + node.label + '\'' + this._nl + body + node.label;
  }

  if (node.type === 'shell') {
    return '`' + body + '`';
  }

  if (node.isDoubleQuote) {
    return '"' + body + '"';
  }

  return '\'' + body + '\'';
};
