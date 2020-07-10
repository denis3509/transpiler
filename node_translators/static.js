/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let writer = this.convert.bind(this);
  return 'static ' + node.items.map(function (x) {
    return writer(x, indent);
  }).join(',' + this._ws);
};
