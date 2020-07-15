const fs = require('fs');
const {createFile} = require('./File');
const engine = require('php-parser');

const defaults = {
  indent: '    ',
  dontUseWhitespaces: false,
  shortArray: false,
  bracketsNewLine: true,
  forceNamespaceBrackets: false,
  collapseEmptyLines: true,
};

class Transpiler {
  _tempVarCount = 0;
  _messages = [];
  _preTranspileFile = [];
  _preTranspileDirectory = [];


  constructor(options) {
    this._options = Object.assign({}, defaults, options);
    this._ws = this._options.dontUseWhitespaces ? '' : ' ';
    this._indent = typeof this._options.indent === 'string' ? this._options.indent : '    ';
    this._nl = this._indent !== '' ? '\n' : '';
    this._shortArray = this._options.shortArray || false;
    this._forceNamespaceBrackets = this._options.forceNamespaceBrackets || false;
  }

  _addMessage(text, node) {
    this._messages.push(message);
  }

  _createTempVar() {
    return '$tempVar' + ++this._tempVarCount;
  }

  processFile(File, path) {
    const code = fs.readFileSync(path);
    const self = this;
    this._preTranspileFile.forEach(f => {
      f.bind(self)();
    });
    const file = new File(code);
    console.log(file.ast);
    // const writer = require('php-unparser');
    // return writer(file.ast);
    return this.convert(file.ast)
  }

  processDirectory(File, path) {
    const self = this;

    this._preTranspileDirectory.forEach(f => {
      f.bind(self)();
      console.log('this', this);
    })
  }

  convert(node, indent) {
    let err;
    if (node === null) {
      return indent
    }
    if (node && node.kind) {
      let writer = this.convert.bind(this);
      let result;
      let count = 0;
      this._nodeReplacers.forEach(replacer => {

        let r = replacer(writer, node, indent, this);
        if (r) result = r;
      });
      if (result) return result;
      if (typeof this[node.kind] === 'function') {
        return this[node.kind](node, indent)
      }
      err = new Error(
        'Unhandled node type [' + node.kind + ']' + (
          node.loc ? ' at line ' + node.loc.start.line : ''
        )
      );
      this._addMessage(1, 'unhandled node type', node);
      return '/* unhandled node type*/'
    } else {
      this._addMessage(1, 'bad ast structure', node);
      node && console.log('Node kind:', node.kind);
      err = new Error('Bad AST structure')
    }
    return '/* undefined node */'
  }

  array = require('./node_translators/array.js');
  assign = require('./node_translators/assign.js');
  bin = require('./node_translators/bin.js');
  block = require('./node_translators/block.js');
  boolean = require('./node_translators/boolean.js');
  break = require('./node_translators/break.js');
  call = require('./node_translators/call.js');
  cast = require('./node_translators/cast.js');
  classconstant = require('./node_translators/classconstant.js');
  //class = require("./php-unparser/node_translators/class.js");
  clone = require('./node_translators/clone.js');
  closure = require('./node_translators/closure.js');
  constant = require('./node_translators/constant.js');
  constref = require('./node_translators/constref.js');
  continue = require('./node_translators/continue.js');
  declare = require('./node_translators/declare.js');
  doc = require('./node_translators/doc.js');
  do = require('./node_translators/do.js');
  echo = require('./node_translators/echo.js');
  empty = require('./node_translators/empty.js');
  encapsed = require('./node_translators/encapsed.js');
  eval = require('./node_translators/eval.js');
  exit = require('./node_translators/exit.js');
  foreach = require('./node_translators/foreach.js');
  for = require('./node_translators/for.js');
  function = require('./node_translators/function.js');
  global = require('./node_translators/global.js');
  goto = require('./node_translators/goto.js');
  identifier = require('./node_translators/identifier.js');
  if = require('./node_translators/if.js');
  include = require('./node_translators/include.js');
  inline = require('./node_translators/inline.js');
  interface = require('./node_translators/interface.js');
  isset = require('./node_translators/isset.js');
  label = require('./node_translators/label.js');
  list = require('./node_translators/list.js');
  magic = require('./node_translators/magic.js');
  method = require('./node_translators/method.js');
  namespace = require('./node_translators/namespace.js');
  new = require('./node_translators/new.js');
  nowdoc = require('./node_translators/nowdoc.js');
  number = require('./node_translators/number.js');
  offsetlookup = require('./node_translators/offsetlookup.js');
  parenthesis = require('./node_translators/parenthesis.js');
  post = require('./node_translators/post.js');
  pre = require('./node_translators/pre.js');
  print = require('./node_translators/print.js');
  program = require('./node_translators/program.js');
  // property = require("./php-unparser/node_translators/property.js");
  propertylookup = require('./node_translators/propertylookup.js');
  retif = require('./node_translators/retif.js');
  return = require('./node_translators/return.js');
  silent = require('./node_translators/silent.js');
  static = require('./node_translators/static.js');
  staticlookup = require('./node_translators/staticlookup.js');
  string = require('./node_translators/string.js');
  switch = require('./node_translators/switch.js');
  throw = require('./node_translators/throw.js');
  trait = require('./node_translators/trait.js');
  traituse = require('./node_translators/traituse.js');
  try = require('./node_translators/try.js');
  unary = require('./node_translators/unary.js');
  unset = require('./node_translators/unset.js');
  usegroup = require('./node_translators/usegroup.js');
  variable = require('./node_translators/variable.js');
  variadic = require('./node_translators/variadic.js');
  while = require('./node_translators/while.js');
  yieldfrom = require('./node_translators/yieldfrom.js');
  yield = require('./node_translators/yield.js');
//my
  expressionstatement = require('./node_translators/expressionstatement.js');
  propertystatement = require('./node_translators/propertystatement.js');
  typereference = require('./node_translators/typereference.js');
  name = require('./node_translators/name.js');
  parentreference = require('./node_translators/parentreference.js');
  class = require('./node_translators/class.js');
  property = require('./node_translators/property.js');
  params = require('./node_translators/helper/parameters')
}

//TODO move create plugin to constructor
const createTranspiler = (...plugins) => {

  plugins.forEach(plugin => {
    for (let key in plugin.transpilerProps) {
      if (!Transpiler.prototype.hasOwnProperty(key)) {
        Transpiler.prototype[key] = plugin.transpilerProps[key];
      } else {
        throw new Error('Attempt to use the same variables by two plugins')
      }
    }
    for (let key in plugin.transpilerMethods) {
      if (!Transpiler.prototype.hasOwnProperty(key)) {
        Transpiler.prototype[key] = plugin.transpilerMethods[key];
      } else {
        throw new Error('Attempt to use the same function name by two plugins')
      }
    }
    Transpiler.prototype._nodeReplacers = [];
    Transpiler.prototype._preTranspileDirectory = [];
    Transpiler.prototype._preTranspileFile = [];
    plugin.nodeReplacer
      ? Transpiler.prototype._nodeReplacers.push(plugin.nodeReplacer)
      : null;
    plugin._preTranspileDirectory
      ? Transpiler.prototype._preTranspileDirectory.push(plugin.preTranspileDirectory)
      : null;
  });

  return Transpiler;
};

module.exports = {
  createTranspiler,
};