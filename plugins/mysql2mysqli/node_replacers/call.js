const callReplacer = (writer, node, indent, self) => {

  const replaceFalse = () => {
    return writer(node.what, indent) +
      '(' + self.params(node.arguments, indent, self) + ')' + ' ? '
      + writer(node.what, indent) +
      '(' + self.params(node.arguments, indent, self) + ')' + ' : -1'
  };

  const strToLower = () => {
    return 'strtolower(' + writer(node.what, indent) +
      '(' + self.params(node.arguments, indent, self) + '))'
  };

  const addI = () => {
    return node.what.name.replace("mysql", "mysqli") +
      '(' + self.params(node.arguments, indent, self) + ')';
  };
  const addIandId = () => {
    const coma = node.arguments.length > 0 ? ', ' : '';
    return node.what.name.replace("mysql", "mysqli") +
      `($_GLOBALS["${self._mysql.connectVar}"]` + coma +
      self.params(node.arguments, indent, self) + ")";
  };

  const replace_mysql_connect = (options) => {
    const args = [...self.params(node.arguments, indent, self).split(", ")];
    const host = args.shift().replace(/['"]/g, '');
    const [hostname, port] = host.split(":");

    return `$_GLOBALS["${self._mysql.connectVar}"] = mysqli_connect("${hostname}", ` +
      `${args.join(", ")}${port ? ', ' + port : ''})`;
  };

  const replace_mysql_select_db = () => {
    const args = [...self.params(node.arguments, indent, self).split(", ")];
    const db_name = args.shift();
    if (node.arguments.length === 1) {
      return `mysqli_select_db($_GLOBALS["${self._mysql.connectVar}"], ${db_name})`
    } else {
      return `mysqli_select_db(${args[0]}, ${db_name})`;
    }
  };
  const replace_mysql_create_db = () => {

    return `mysqli_query($_GLOBALS["${self._mysql.connectVar}"], ` +
      `"CREATE DATABASE ".${self.params(node.arguments, indent, self)})`
  };

  const replace_mysql_drop_db = () => {

    return `mysqli_query($_GLOBALS["${self._mysql.connectVar}"], ` +
      `"DROP DATABASE ".${self.params(node.arguments, indent, self)})`
  };

  const replace_mysql_escape_string = () => {
    return `mysql_real_escape_string($_GLOBALS["${self._mysql.connectVar}"],` +
      ` ${self.params(node.arguments, indent, self)})`;
  };

  const replace_mysql_client_encoding = () => {
    return `mysqli_character_set_name($_GLOBALS["${self._mysql.connectVar}"])`;
  };

  const replace_mysql_list_dbs = () => {
    return `mysqli_query($_GLOBALS["${self._mysql.connectVar}"], "SHOW DATABASES")`;
  };

  const replace_mysql_list_process = () => {
    return `mysqli_thread_id($_GLOBALS["${self._mysql.connectVar}"])`;
  };

  const replace_mysql_list_tables = () => {
    return `mysqli_query($_GLOBALS["${self._mysql.connectVar}"],` +
      ` "SHOW TABLES from ".${self.params(node.arguments, indent, self)}`
  };

  const replace_mysql_num_fields = () => {
    return `mysqli_field_count($_GLOBALS["${self._mysql.connectVar}"], ` +
      `${self.params(node.arguments, indent, self)})`;
  };
  const replace_mysql_unbuffered_query = () => {
    return `mysqli_query($_GLOBALS["${self._mysql.connectVar}"], ` +
      `${self.params(node.arguments, indent, self)}, MYSQLI_USE_RESULT)`
  };
  const replace_mysql_field_name = () => {
    return `mysqli_fetch_field_direct(${self.params(node.arguments, indent, self)})->name`
  };
  const replace_mysql_field_length = () => {
    return `mysqli_fetch_field_direct(${self.params(node.arguments, indent, self)})->length`
  };
  const replace_mysql_field_table = () => {
    return `mysqli_fetch_field_direct(${self.params(node.arguments, indent, self)})->table`
  };

  const calls = {
    "mysql_field_name": () => replace_mysql_field_name(),
    "mysql_field_len": () => replace_mysql_field_length(),
    "mysql_field_table": () => replace_mysql_field_table(),
    'ip2long': () => replaceFalse(),
    'get_class': () => strToLower(),
    'get_parent_class': () => strToLower(),
    "get_class_methods": () => strToLower(),
    'mysql_data_seek': () => addI(),
    "mysql_fetch_array": () => addI(),
    "mysql_fetch_assoc": () => addI(),
    "mysql_fetch_lengths": () => addI(),
    "mysql_fetch_object": () => addI(),
    "mysql_fetch_row": () => addI(),
    "mysql_field_seek": () => addI(),
    "mysql_free_result": () => addI(),
    "mysql_num_rows": () => addI(),
    "mysql_affected_rows": () => addIandId(),
    "mysql_close": () => addIandId(),
    "mysql_errno": () => addIandId(),
    "mysql_error": () => addIandId(),
    "mysql_get_client_info": () => addIandId(),
    "mysql_get_host_info": () => addIandId(),
    "mysql_get_proto_info": () => addIandId(),
    "mysql_get_server_info": () => addIandId(),
    "mysql_info": () => addIandId(),
    "mysql_insert_id": () => addIandId(),
    "mysql_ping": () => addIandId(),
    "mysql_real_escape_string": () => addIandId(),
    "mysql_stat": () => addIandId(),
    "mysql_thread_id": () => addIandId(),
    'mysql_connect': (options) => replace_mysql_connect(options),
    "mysql_select_db": () => replace_mysql_select_db(),
    "mysql_drop_db": () => replace_mysql_drop_db(),
    "mysql_escape_string": () => replace_mysql_escape_string(),
    "mysql_client_encoding": () => replace_mysql_client_encoding(),
    "mysql_list_dbs": () => replace_mysql_list_dbs(),
    "mysql_list_processes": () => replace_mysql_list_process(),
    "mysql_num_fields": () => replace_mysql_num_fields(),
    "mysql_unbuffered_query": () => replace_mysql_unbuffered_query(),
    "mysql_list_tables": () => replace_mysql_list_tables(),
    "mysql_create_db": () => replace_mysql_create_db(),
  };
  if (typeof calls[node.what.name] === 'function') return calls[node.what.name]();
  return false;
};
module.exports = callReplacer;