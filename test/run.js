
const engine = require('php-parser');
const fs = require('fs');
const mysqli = require('../plugins/mysql2mysqli/index');
const File = require('../File').createFile(mysqli);
const Transpiler = require('../Transpiler').createTranspiler(mysqli);


const parser = new engine({
  parser: {
    extractDoc: true,
    //php7: true
  },
  ast: {
    withPositions: true
  }
});

const tr = new Transpiler();
tr._mysql.connectVar = 'link1';
console.log(__dirname);
const f = fs.readFileSync('./php-source/test-php7.php');
const file = new File(f);
const output =  JSON.stringify(file.ast, null, 2);
fs.writeFileSync('./output',output);
const  result = tr.processFile(File,   './php-source/test-php7.php');
const key = {
  name : 'Denis',
  age : 23,
};
console.log(result);
const m = new Map();
