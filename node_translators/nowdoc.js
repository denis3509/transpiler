/*jslint node: true, indent: 2, unparam:true */
'use strict';

module.exports = function (node) {
  return '<<<\'' + node.label + '\'' + this._nl + node.value + this._nl + node.label;
};
