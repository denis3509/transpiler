const assignReplacer = (writer, node, indent, self) => {

  const replace_mysql_db_name = () => {
    const args1 = node.right.arguments;
    const args2 = [node.right.arguments[0]];
    const tempVar1 = self._createTempVar();

    return `mysqli_data_seek(${self.params(args1, indent, self)});\n` +
      `${tempVar1} = mysqli_fetch_row(${self.params(args2, indent, self)});\n` +
      `${writer(node.left)} = ${tempVar1}[0]`
  };

  const replace_mysql_fetch_field = () => {
    const [result, num] = self.params(node.right.arguments, indent, self).split(", ");
    return `for($x = 0; $x < ${num}; $x++) {\n` +
      `mysqli_fetch_field(${result});\n` +
      `}\n`+
      `${writer(node.left)} = mysqli_fetch_field(${result})`
  };


  const calls = {
    "mysql_db_name": () => replace_mysql_db_name(),
    "mysql_fetch_field": () => replace_mysql_fetch_field(),
  };

  if (node.right.kind === 'call' && calls[node.right.what.name]) return calls[node.right.what.name]();
  return false;
};

module.exports = assignReplacer;