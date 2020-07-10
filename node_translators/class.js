/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body.js');

module.exports = function (node, indent) {
  let writer, str, that;

  writer = this.convert.bind(this);
  str = '';
  that = this;

  // Start
  if (node.isAbstract) {
    str += 'abstract ';
  } else if (node.isFinal) {
    str += 'final ';
  }

  str += 'class';
  if (node.name) {
    str += ' ' + writer(node.name, indent);
  }

  if (node.extends) {
    str += ' extends ' + writer(node.extends, indent);
  }

  if (node.implements) {
    str += ' implements ' + node.implements.map(function (x) {
      return writer(x, indent);
    }).join(',' + that._ws);
  }

  // begin curly brace
  if (node.name) {
    if (this._options.bracketsNewLine) {
      str += this._nl + indent + '{' + this._nl;
    } else {
      str += this._ws + '{' + this._nl;
    }
  } else {
    str += this._ws + '{' + this._nl;
  }


  // class body
  str += doBody.call(this, writer, indent, node.body);

  // end curly brace
  str += indent + '}';
  if (node.name) {
    str += this._nl;
  }

  return str;
};
