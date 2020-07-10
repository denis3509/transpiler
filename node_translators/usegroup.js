/*jslint node: true, indent: 2 */
'use strict';

/**
 * Usage declaration
 */
module.exports = function (node, indent) {
  let str = 'use' + this._ws, items, glue;
  if (node.type) {
    str += node.type + this._ws;
  }

  items = (node.items || []).map(function (item) {
    let useItem = item.name;
    if (item.alias) {
      useItem += ' as ' + item.alias;
    }
    return useItem;
  });

  if (node.items.length > 1) {
    glue = this._nl +  indent + this._indent;
    str += node.name + this._ws + '{' + glue;
    str += items.join(',' + glue) + this._nl;
    str += indent + '};' + this._nl;
  } else {
    str += items[0] + ';' + this._nl;
  }
  return str;
};
