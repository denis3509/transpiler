/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  let self = this, union, body;

  if (node.alreadyParsed) {
    return '';
  }

  if (node.isDoc) {
    body = node.lines.join(this._nl + indent + ' * ');
    if (body.substring(body.length - 3) === ' * ') {
      body = body.substring(0, body.length - 3);
    }
    return this._nl + indent + '/** ' + body + ' */';
  }

  union = self._nl + indent + self._ws + self._ws;
  return node.lines.reduce(function (acc, line) {

    if (line.indexOf('\n') > -1) {
      return acc.concat('/*' + line.split("\n").join(union) + '*/');
    }

    return acc.concat('// ' + line);
  }, []).join(self._nl + indent);

};
