/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (args, indent, self) {
  let writer, useArgs = [], space, raw;

  writer = self.convert.bind(self);

  function processElement(indent) {
    return function (arg) {
      return writer(arg, indent);
    };
  }
  if (args && args.length > 0) {
    useArgs = args.map(processElement(indent));
  }
  raw = useArgs.join();
  if ((raw.indexOf("\n") > -1
    && raw.substr(0, raw.indexOf("\n")).length > 80)
    || (raw.indexOf("\n") === -1 && raw.length > 80)) {
    useArgs = args.map(processElement(indent + self._indent));
    space = self._nl + indent + self._indent;
    args = space + useArgs.join(',' + space) + self._nl + indent;
  } else {
    args = useArgs.join(',' + self._ws);
  }
  return args;
};
