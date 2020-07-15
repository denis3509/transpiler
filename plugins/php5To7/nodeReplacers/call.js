
const callReplacer = (writer, node, indent, self)=> {

  const ifListIsEmpty = () => {
    const argsStr = self.params(node.arguments, indent, self).replace(/["' ]/g, '');
    if (argsStr === '') return `${node.what.name}(${self.params(node.arguments)}) ` +
    `/*Warning! List must not be empty*/`;
    return false;
  };

  const calls = {
    "list" : ()=> ifListIsEmpty(),
  };

  if (calls[node.what.name]) return calls[node.what.name]();
  return false;
};

module.exports = callReplacer;