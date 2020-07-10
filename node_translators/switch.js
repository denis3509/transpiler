/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

module.exports = function (node, indent) {
  let writer, str, that = this, cases;

  writer = this.convert.bind(this);
  str = 'switch' + this._ws + '(' + writer(node.test, indent) + ')';
  if (node.shortForm) {
    str += ':' + this._nl;
  } else {
    str += this._ws + '{' + this._nl;
  }
  cases = node.body.children.map(function (item) {
    let head;
    if (item.test) {
      head = indent + that._indent + 'case ' + writer(item.test, indent) + ':' + that._nl;
    } else {
      head = indent + that._indent + 'default:' + that._nl;
    }
    if (item.body) {
      head += doBody.call(that, writer, indent + that._indent, item.body.children || [item.body]);
    }
    return head;
  });
  str += cases.join('');
  if (node.shortForm) {
    str += indent + 'endswitch;';
  } else {
    str += indent + '}';
  }
  return str;
};
