const Plugin = require('../Plugin');
const plugin = new Plugin();
const callReplacer = require('./node_replacers/call');
plugin.fileMethods.getMySqlParams = function getMysqlParams() {
  const mysqli = {};

  const mysql_connect = this.search('call', (node) => {
    return node.what.name === 'mysql_connect';
  })[0];

  if (mysql_connect) {
    mysqli.hostName = mysql_connect.arguments[0].name;
    mysqli.userName = mysql_connect.arguments[1].name;
    mysqli.password = mysql_connect.arguments[2].name;
  }
  const mysql_select_db = this.search('call', (node) => {
    return node.what.name === 'mysql_connect';
  })[0];
  if (mysql_select_db[0]) {
    mysqli.dbName = mysql_select_db.arguments[0].name;
  }

  const mysql_set_charset = this.search('call', (node) => {
    return node.what.name === 'mysql_set_charset';
  })[0];
  if (mysql_set_charset) {
    mysqli.charset = mysql_set_charset.arguments[0].name;
  }
  return mysqli;
};

plugin.transpilerProps._currentMysqlParams = {};

plugin.transpilerMethods.setCurrentMysqlParams = function (file) {
 this._currentMysqlParams = file.getMysqlParams();
};
plugin.preTranspileFile = function () {
  console.log('preTranspileFile this', this);
  this.setCurrentMysqlParams();
};
plugin.preTranspileDirectory = function() {
  console.log('preTranspileDirectory this : ', this);
};
plugin.nodeReplacer = function (writer, node, indent, self) {
  const nodes = {
    call : callReplacer(writer, node, indent, self),
  };

  if (nodes[node.kind]) return nodes[node.kind](writer,node,indent,self);
  return false;
};
module.exports = plugin;