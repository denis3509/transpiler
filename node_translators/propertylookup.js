/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer, prop;
  writer = this.convert.bind(this);
  prop = (function () {
    let child = node.offset;

    if (child.kind === 'constref') {
      return child.name;
    }
    if (child.kind === 'variable') {
      return writer(child, indent);
    }
    if (child.kind === 'identifier'){
      return  writer(child, indent)  ;
    }

    return '{' + writer(child, indent) + '}';

  }());

  return writer(node.what, indent) + '->' + prop;
};
