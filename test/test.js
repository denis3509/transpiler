
const engine = require('php-parser');

const mysqli = require('../plugins/mysql2mysqli/index');
const File = require('../File').createFile(mysqli);
const Transpiler = require('../index').createTranspiler(mysqli);


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
const  result = tr.processFile(File,'test/php-source/test-php.php');
console.log(result);
