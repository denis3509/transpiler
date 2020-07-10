// /*jslint node: true, indent: 2, nomen:true, evil: true */
// 'use strict';
//
// const defaults = {
//   indent: '    ',
//   dontUseWhitespaces: false,
//   shortArray: false,
//   bracketsNewLine: true,
//   forceNamespaceBrackets: false,
//   collapseEmptyLines: true,
//   mysqli : {},
// };
//
//
//
// function Writer(options) {
//
//   // Get options
//   this._options = Object.assign({}, defaults, options);
//   this._ws = this._options.dontUseWhitespaces ? '' : ' ';
//   this._indent = typeof this._options._indent === 'string' ? this._options._indent : '    ';
//   this._nl = this._indent !== '' ? '\n' : '';
//   this._shortArray = this._options.shortArray || false;
//   this._forceNamespaceBrackets = this._options.forceNamespaceBrackets || false;
//
//   this.convert = function (node, indent) {
//
//     let err;
//
//     if (node === null) {
//       return indent;
//     }
//
//     if (node && node.kind) {
//       if (typeof this[node.kind] === 'function') {
//         return this[node.kind](node, indent);
//       }
//       err = new Error(
//         'Unhandled node type [' + node.kind + ']' + (
//           node.loc ? ' at line ' + node.loc.start.line : ''
//         )
//       );
//       transpiler.addMessage(1,'unhandled node type', node)
//       return '/* unhandled node type*/'
//     } else {
//       console.log('Node:', node);
//       transpiler.addMessage(1,'bad ast structure', node)
//       node && console.log('Node kind:', node.kind);
//       err = new Error('Bad AST structure');
//     }
//
//     return '/* undefined node */'
//   };
// }
//
// module.exports = Writer;
//
// // node translators
// Writer.prototype.array = require("./array.js");
// Writer.prototype.assign = require("./assign.js");
// Writer.prototype.bin = require("./bin.js");
// Writer.prototype.block = require("./block.js");
// Writer.prototype.boolean = require("./boolean.js");
// Writer.prototype.break = require("./break.js");
// Writer.prototype.call = require("./call.js");
// Writer.prototype.cast = require("./cast.js");
// Writer.prototype.classconstant = require("./classconstant.js");
// Writer.prototype.class = require("./class.js");
// Writer.prototype.clone = require("./clone.js");
// Writer.prototype.closure = require("./closure.js");
// Writer.prototype.constant = require("./constant.js");
// Writer.prototype.constref = require("./constref.js");
// Writer.prototype.continue = require("./continue.js");
// Writer.prototype.declare = require("./declare.js");
// Writer.prototype.doc = require("./doc.js");
// Writer.prototype.do = require("./do.js");
// Writer.prototype.echo = require("./echo.js");
// Writer.prototype.empty = require("./empty.js");
// Writer.prototype.encapsed = require("./encapsed.js");
// Writer.prototype.eval = require("./eval.js");
// Writer.prototype.exit = require("./exit.js");
// Writer.prototype.foreach = require("./foreach.js");
// Writer.prototype.for = require("./for.js");
// Writer.prototype.function = require("./function.js");
// Writer.prototype.global = require("./global.js");
// Writer.prototype.goto = require("./goto.js");
// Writer.prototype.identifier = require("./identifier.js");
// Writer.prototype.if = require("./if.js");
// Writer.prototype.include = require("./include.js");
// Writer.prototype.inline = require("./inline.js");
// Writer.prototype.interface = require("./interface.js");
// Writer.prototype.isset = require("./isset.js");
// Writer.prototype.label = require("./label.js");
// Writer.prototype.list = require("./list.js");
// Writer.prototype.magic = require("./magic.js");
// Writer.prototype.method = require("./method.js");
// Writer.prototype.namespace = require("./namespace.js");
// Writer.prototype.new = require("./new.js");
// Writer.prototype.nowdoc = require("./nowdoc.js");
// Writer.prototype.number = require("./number.js");
// Writer.prototype.offsetlookup = require("./offsetlookup.js");
// Writer.prototype.parenthesis = require("./parenthesis.js");
// Writer.prototype.post = require("./post.js");
// Writer.prototype.pre = require("./pre.js");
// Writer.prototype.print = require("./print.js");
// Writer.prototype.program = require("./program.js");
// Writer.prototype.property = require("./property.js");
// Writer.prototype.propertylookup = require("./propertylookup.js");
// Writer.prototype.retif = require("./retif.js");
// Writer.prototype.return = require("./return.js");
// Writer.prototype.silent = require("./silent.js");
// Writer.prototype.static = require("./static.js");
// Writer.prototype.staticlookup = require("./staticlookup.js");
// Writer.prototype.string = require("./string.js");
// Writer.prototype.switch = require("./switch.js");
// Writer.prototype.throw = require("./throw.js");
// Writer.prototype.trait = require("./trait.js");
// Writer.prototype.traituse = require("./traituse.js");
// Writer.prototype.try = require("./try.js");
// Writer.prototype.unary = require("./unary.js");
// Writer.prototype.unset = require("./unset.js");
// Writer.prototype.usegroup = require("./usegroup.js");
// Writer.prototype.variable = require("./variable.js");
// Writer.prototype.variadic = require("./variadic.js");
// Writer.prototype.while = require("./while.js");
// Writer.prototype.yieldfrom = require("./yieldfrom.js");
// Writer.prototype.yield = require("./yield.js");
// //my
// Writer.prototype.expressionstatement = require('./expressionstatement.js');
// Writer.prototype.propertystatement = require('./propertystatement.js');
// Writer.prototype.typereference = require('./typereference.js');
// Writer.prototype.name = require('./name.js');
// Writer.prototype.parentreference = require('./parentreference.js');
// Writer.prototype.class = require('./class.js');
// Writer.prototype.property = require('./property.js');
// Writer.prototype.params = require('./helper/parameters')