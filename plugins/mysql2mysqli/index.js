const Plugin = require('../Plugin');
const plugin = new Plugin();
const callReplacer = require('./node_replacers/call');
const assignReplacer = require('./node_replacers/assign');

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

plugin.transpilerProps._mysql ={
  connectVarCount : 0,
};

plugin.transpilerMethods.createConnectVar = function (file) {
  this._mysql.connectVar = this._mysql.connectVarCount++;
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
    call : () => callReplacer(writer, node, indent, self),
    assign : ()=> assignReplacer(writer, node, indent, self),
  };
  if (typeof nodes[node.kind] === "function") return nodes[node.kind]();
  return false;
};
module.exports = plugin;