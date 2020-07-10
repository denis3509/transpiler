/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

module.exports = function (node, indent) {
  let writer, str, items = [], k;
  writer = this.convert.bind(this);
  for (k in node.what) {
    if (node.what.hasOwnProperty(k) && node.what[k]) {
      items.push(k + this._ws + '=' + this._ws + writer(node.what[k]));
    }
  }
  str = 'declare(' + items.join(',' + this._ws) + ')';
  if (node.mode !== 'none') {
    str += this._ws + '{' + this._nl;
    str += doBody.call(this, writer, indent, node.children);
    str += indent + '}' + this._nl;
  } else {
    str += ';' + this._nl;
    str += doBody.call(this, writer, indent, node.children, true);
  }
  return str;
};
