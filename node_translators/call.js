/*jslint node: true, indent: 2 */
'use strict';


module.exports = function (node, indent) {
  const writer = this.convert.bind(this);
  // let result;
  // this._nodeReplacers.forEach(replacer=>{
  //   let r =  replacer(writer,node,indent, this);
  //   if (r) result = r;
  // });
  // if (result) return result;

  return writer(node.what, indent) +
    '(' + this.params(node.arguments, indent, this) + ')';

};