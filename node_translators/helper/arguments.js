/*jslint node: true, indent: 2 */
'use strict';

// name, type, value, isRef, isVariadic
function processElement(indent, ws, writer) {
  return function (arg) {
    let str = '';

    if (arg.nullable) {
      str += '?';
    }

    if (arg.type) { // type hint
      str += writer(arg.type, indent) + ws;
    }

    if (arg.byref) { // byref
      str += '&';
    }

    if (arg.variadic) { // variadic
      str += '...';
    }

    str += '$' + writer(arg.name, indent); // name

    if (arg.value) { // default value
      str += ws + '=' + ws + writer(arg.value, indent);
    }

    return str;
  };
}

module.exports = function (nodes, indent, self) {
  let writer, args, space, listArgs;

  writer = self.convert.bind(self);
  args = nodes.map(processElement(indent, self._ws, writer));
  listArgs = args.join(',' + self._ws);

  if (listArgs.length > 80) {
    space = self._nl + indent + self._indent;
    args = nodes.map(processElement(indent + self._indent, self._ws, writer));
    listArgs = space + args.join(',' + space) + self._nl + indent;
  }

  return '(' + listArgs + ')';
};
