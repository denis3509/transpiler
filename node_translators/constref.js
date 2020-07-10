/*jslint node: true, indent: 2 */
'use strict';

let identifier = require('./helper/identifier');
/**
 * Constant usage
 */
module.exports = function (node) {
  if (typeof node.name === 'string') {
    return identifier(node);
  }
  return identifier(node.name);
};
