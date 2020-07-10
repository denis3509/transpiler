/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');
let identifier = require('./helper/identifier');

function resolveExceptions(items) {
  let result = [], i;
  for (i = 0; i < items.length; i += 1) {
    result.push(identifier(items[i]));
  }
  return result.join('|');
}

module.exports = function (node, indent) {
  let writer, str;


  writer = this.convert.bind(this);
  str = 'try' + this._ws + '{' + this._nl;
  str += doBody.call(this, writer, indent, node.body.children);
  str += indent + '}';

  str += node.catches.map(function (except) {
    let out = this._ws + 'catch' + this._ws + '(' + resolveExceptions(except.what) + ' ' + writer(except.variable) + ')' + this._ws + '{' + this._nl;
    out += doBody.call(this, writer, indent, except.body.children);
    out += indent + '}';
    return out;
  }, this).join('');

  if (node.always) {
    str += this._ws + 'finally' + this._ws + '{' + this._nl;
    str += doBody.call(this, writer, indent, node.always.children);
    str += indent + '}';
  }

  return str;
};
