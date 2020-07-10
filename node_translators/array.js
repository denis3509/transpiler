/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer, elements, that, body, space;
  writer = this.convert.bind(this);
  that = this;

  function processElement(indent) {
    return function (ele) {
      let value = writer(ele.value, indent);
      if (ele.key) {
        return writer(ele.key, indent) + that._ws + '=>' + that._ws + value;
      }
      return value;
    };
  }

  elements = node.items.map(processElement(indent));

  if (elements.join().length > 80) {
    space = that._nl + indent + this._indent;
    elements = node.items.map(processElement(indent + this._indent));
    body = space + elements.join(',' + space) + that._nl + indent;
  } else {
    body = elements.join(',' + that._ws);
  }

  if (node.shortForm || this._shortArray) {
    return '[' + body + ']';
  }
  return 'array(' + body + ')';
};
