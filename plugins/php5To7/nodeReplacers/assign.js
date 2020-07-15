const assignReplacer = (writer, node, indent, self) => {

  const warn_about_list = () => {
    const argsStr = self.params(node.arguments, indent, self).replace(/["' ]/g, '');
    if (node.arguments === 0)
      return `//list() must not be empty\n`+
        `${writer(node.left, indent)}`;
  };

  const calls = {
    "list": warn_about_list(),
  }

};


module.exports = assignReplacer;