module.exports = function (node, indent) {
  let writer, str = '';
  if (node.isFinal) {
    str += 'final ';
  }
  if (node.isStatic) {
    str += 'static ';
  }
  str += node.visibility ? node.visibility : '';
  writer = this.convert.bind(this);

  return str + ' ' + writer(node.properties[0], indent)
};
