module.exports = function property(node, indent) {
  let str = '';
  let writer = this.convert.bind(this);
  str += '$' + writer(node.name, indent);
  if (node.value) {
    str += ' = ' + writer(node.value, indent);
  }
  return str;
};
