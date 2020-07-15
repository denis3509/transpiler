const Plugin = require('../Plugin');
const callReplacer = require('./nodeReplacers/call');
const assignReplacer = require('./nodeReplacers/assign');
const plugin = new Plugin();

plugin.nodeReplacer = nodeReplacer = (writer, node , indent ,self)=> {
  const replacers = {
    "call" : () => callReplacer(writer, node, indent, self),
    "assign" : () => assignReplacer(writer, node, indent, self),
  };
  if (typeof replacers[node.kind] === "function") return replacers[node.kind]();
  return false;
};