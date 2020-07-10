module.exports = function (node, indent) {
  const writer = this.convert.bind(this);
  return node.raw;
};
