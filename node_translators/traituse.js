/*jslint node: true, indent: 2 */
'use strict';

let identifier = require('./helper/identifier');

/**
 * Usage declaration
 */
module.exports = function (node, indent) {
  let str = 'use' + this._ws, items = [], glue, writer;
  writer = this.convert.bind(this);
  node.traits.forEach(function (item) {
    items.push(
      writer(item, indent)
    );
  });
  str += items.join(',' + this._ws);
  if (node.adaptations) {
    glue = this._nl +  indent + this._indent;
    str += this._ws + '{' + glue;
    str += node.adaptations.map(function (item) {
      let out = '';
      if (item.trait) {
        out += writer(item.trait, indent) + '::';
      }
      if (item.method) {
        out += item.method;
      }
      if (item.kind === 'traitprecedence') {
        out += ' insteadof ';// + writer(item.insteadof);
        out += item.instead.map(identifier).join(', ');
      } else {
        out += ' as ';
        if (item.visibility) {
          out += item.visibility + ' ';
        }
        out += item.as;
      }
      return out + ';';
    }).join(glue) + this._nl;
    str += indent + '}';
  } else {
    str += ';';
  }
  return str + this._nl;
};
