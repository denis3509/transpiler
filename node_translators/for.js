/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

module.exports = function (node, indent) {
  let writer, str;

  writer = this.convert.bind(this);
  str = 'for' + this._ws + '(';

  if (node.init) {
    str += node.init.map(function (x) {
      if (x) {
        return writer(x, indent);
      }
      return '';
    }).join(',' + this._ws);
  }
  str += ';' + this._ws;

  if (node.test) {
    str += node.test.map(function (x) {
      if (x) {
        return writer(x, indent);
      }
      return '';
    }).join(',' + this._ws);
  }
  str += ';' + this._ws;

  if (node.increment) {
    str += node.increment.map(function (x) {
      if (x) {
        return writer(x, indent);
      }
      return '';
    }).join(',' + this._ws);
  }
  str += ')';
  if (this.shortForm) {
    str += ':' + this._nl;
  } else {
    str += this._ws + '{' + this._nl;
  }

  str += doBody.call(this, writer, indent, node.body.children || [node.body]);

  if (this.shortForm) {
    str += indent + 'endfor;';
  } else {
    str += indent + '}';
  }
  return str;
};
