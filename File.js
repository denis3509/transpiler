const engine = require('php-parser');const parser = new engine({  parser: {    extractDoc: true,    //php7: true  },  ast: {    withPositions: true  }});class File {  _ast;  constructor (code) {    this._ast = parser.parseCode(code);  }  get ast () {    return this._ast;  }  search (type, match = () => true) {    let matches = [];    this.find = function (node, type, match) {      if (node && node.kind === type && match(node)) {        matches.push(node)      }      let finder = this.find.bind(this);      if (Array.isArray(node)) {        node.forEach((node) => {          if (typeof node === 'object' && node !== null) finder(node, type, match)        })      } else {        for (let key in node) {          let obj = node[key];          if (typeof obj === 'object' && obj !== null) finder(obj, type, match);        }      }    };    this.find(this.ast, type, match);    return matches;  };}const createFile = (...plugins) => {  plugins.forEach(plugin=>{    for ( let key in plugin.fileProps) {      if (!File.prototype.hasOwnProperty(key)) {        File.prototype[key] = plugin[key];      } else{        throw new Error('Attempt to use the same prop name in two plugins');      }    }    for ( let key in plugins.fileMethods) {      if(!File.prototype[key]) {        File.prototype[key] = plugins.fileMethods[key];      } else {         throw new Error('Attempt to use the same method name in two plugins');      }    }  });  return File;};module.exports= {  createFile,};