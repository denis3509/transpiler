/*jslint node: true, indent: 2 */
'use strict';

let doBody = require('./helper/body');

module.exports = function processIf(node, indent, inner) {
  let writer, str, that = this;

  writer = this.convert.bind(this);

  str = 'if' + this._ws + '(' + writer(node.test, indent) + ')';

  if (node.body) {
    if (node.shortForm) {
      str += ':' + this._nl;
    } else {
      str += this._ws + '{' + this._nl;
    }

    str += doBody.call(this, writer, indent, node.body.children || [node.body]);

    if (!node.shortForm) {
      str += indent + '}';
    }
  } else if (!node.alternate) {
    return str + ';';
  }

  if (node.alternate) {
    str += (function () {
      let out = '';
      // is an "elseif"
      if (node.alternate.kind === 'if') {
        if (node.shortForm) {
          return indent + 'else' + processIf.call(that, node.alternate, indent, true);
        }
        return that._ws + 'else' + processIf.call(that, node.alternate, indent, true);
      }

      // is an "else"
      if (node.shortForm) {
        out += indent + 'else:' + that._nl;
      } else {
        out += that._ws + 'else' + that._ws + '{' + that._nl;
      }

      out += doBody.call(that, writer, indent, node.alternate.children || [node.alternate]);

      if (!node.shortForm) {
        out += indent + '}' + that._nl;
      }
      return out;
    }());
  }

  if (node.shortForm && !inner) {
    str += indent + 'endif;' + this._nl;
  }
  return str;
};
