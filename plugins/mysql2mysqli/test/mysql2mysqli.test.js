//const {test,expect} = require('jest');
const mysql2mysqli = require('../index');
const File = require('../../../File').createFile(mysql2mysqli);
const Transpiler = require('../../../Transpiler').createTranspiler(mysql2mysqli);

const callReplacer = require('../node_replacers/call');
const assignReplacer = require('../node_replacers/assign');
const replacer = require('../index').nodeReplacer;
const engine = require('php-parser');
const fs = require('fs');
const indent = '';
const parser = new engine({
  parser: {
    extractDoc: true,
    //php7: true
  },
  ast: {
    withPositions: true
  }
});
const code = fs.readFileSync(__dirname + '/mysql2mysqli.php');
const file = new File(code);
const ast = file.ast;
const self = {};
const tr = new Transpiler();
tr._mysql.connectVar = 'link1';
describe('mysql2mysqli call replacer', () => {

  test('replace false', () => {
    const file = (new File('<?php ip2long(\'192.168.0.1\');'));
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('ip2long("192.168.0.1") ? ip2long("192.168.0.1") : -1')
  });

  test('lowercase function', () => {
    const file = (new File('<?php get_class(Person);'));
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('strtolower(get_class(Person))')
  });

  test('lowercase function', () => {
    const file = (new File('<?php get_parent_class(Person);'));
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('strtolower(get_parent_class(Person))');
  });

  test('mysql_connect 3 params', () => {
    const file = new File("<?php mysql_connect('localhost', 'my_user', 'my_password');");
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('$_GLOBALS["link1"] = mysqli_connect("localhost", "my_user", "my_password")');
  });

  test('mysql_connect 4 params, port', () => {
    const code = "mysql_connect('localhost:8908', 'my_user', 'my_password', 'db_name')";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('$_GLOBALS["link1"] = mysqli_connect("localhost", "my_user", "my_password", "db_name", 8908)');
  });

  // test('mysql_connect 4 params, port, socket', ()=> { //TODO with socket
  //   const code = "mysql_connect('localhost:8908:/mysocket', 'my_user', 'my_password', db_name)";
  //   const phpCode = "<?php" + code +
  //     ";";
  //   const file =  new File(phpCode);
  //   const node = file.ast.children[0].expression;
  //   expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
  //     .toBe("mysqli_connect('localhost', 'my_user', 'my_password', db_name, '8908')");
  // });
  test('mysql_connect 6 params, port', () => {
    const code = "mysql_connect('localhost:8908', 'my_user', 'my_password', 'db_name',)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('$_GLOBALS["link1"] = mysqli_connect("localhost", "my_user", "my_password", "db_name", 8908)');
  });

  test('mysql_select_db with link', () => { //TODO connect identifier mysql get params
    const code = "mysql_select_db('foo', $link);";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_select_db($link, "foo")');
  });

  test('mysql_select_db without link', () => { //TODO connect identifier mysql get params
    const code = "mysql_select_db('foo');";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_select_db($_GLOBALS["link1"], "foo")');
  });

  test('add i to function name', () => {
    const input = [
      'mysql_data_seek($result, $offset);',
      "mysql_fetch_array($result, $result_type);",
      "mysql_fetch_assoc($result);",
      "mysql_fetch_lengths($result);",
      "mysql_fetch_object($result, $class_name);",
      "mysql_fetch_row($result);",
      "mysql_field_seek($result, $fieldName);",
      "mysql_free_result($result);",
      "mysql_num_rows($result);",
    ].map(fn => "<?php " + fn);
    const output = [
      'mysqli_data_seek($result, $offset)',
      "mysqli_fetch_array($result, $result_type)",
      "mysqli_fetch_assoc($result)",
      "mysqli_fetch_lengths($result)",
      "mysqli_fetch_object($result, $class_name)",
      "mysqli_fetch_row($result)",
      "mysqli_field_seek($result, $fieldName)",
      "mysqli_free_result($result)",
      "mysqli_num_rows($result)",
    ];
    expect(input.map(phpCode => {
      const file = new File(phpCode);
      const node = file.ast.children[0].expression;
      return callReplacer(tr.convert.bind(tr), node, indent, tr)
    })).toEqual(output);
  });

  test('add i to function name and link identifier as the first argument', () => {
    const input = [
      "mysql_affected_rows();",
      "mysql_close();",
      "mysql_errno();",
      "mysql_error();",
      "mysql_get_client_info();",
      "mysql_get_host_info();",
      "mysql_get_proto_info();",
      'mysql_get_server_info();',
      "mysql_info();",
      'mysql_insert_id();',
      "mysql_ping();",
      "mysql_real_escape_string($unescaped_string);",
      "mysql_stat();",
      "mysql_thread_id();",
    ].map(fn => "<?php " + fn);

    const output = [
      'mysqli_affected_rows($_GLOBALS["link1"])',
      'mysqli_close($_GLOBALS["link1"])',
      'mysqli_errno($_GLOBALS["link1"])',
      'mysqli_error($_GLOBALS["link1"])',
      'mysqli_get_client_info($_GLOBALS["link1"])',
      'mysqli_get_host_info($_GLOBALS["link1"])',
      'mysqli_get_proto_info($_GLOBALS["link1"])',
      'mysqli_get_server_info($_GLOBALS["link1"])',
      'mysqli_info($_GLOBALS["link1"])',
      'mysqli_insert_id($_GLOBALS["link1"])',
      'mysqli_ping($_GLOBALS["link1"])',
      'mysqli_real_escape_string($_GLOBALS["link1"], $unescaped_string)',
      'mysqli_stat($_GLOBALS["link1"])',
      'mysqli_thread_id($_GLOBALS["link1"])'
    ];
    expect(input.map(phpCode => {
      const file = new File(phpCode);
      const node = file.ast.children[0].expression;
      return callReplacer(tr.convert.bind(tr), node, indent, tr)
    })).toEqual(output);
  });

  test("mysql_create_db('database_name')", () => {
    const code = "mysql_create_db('database_name')";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_query($_GLOBALS["link1"], "CREATE DATABASE "."database_name")');
  });

  test("$data = mysql_db_name($result, $row)", () => {
    const code = "$data = mysql_db_name($result, $row)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(assignReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe(`mysqli_data_seek($result, $row);\n` +
         `$tempVar1 = mysqli_fetch_row($result);\n`+
         `$data = $tempVar1[0]`);
  });
  // test("$result = mysql_db_query('database', 'query')", () => { // TODO
  //   const code = "$result = mysql_db_query('database', 'query')";
  //   const phpCode = "<?php " + code +
  //     ";";
  //   const file = new File(phpCode);
  //   const node = file.ast.children[0].expression;
  //   expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
  //     .toBe("mysqli_select_db( 'database' );\n" +
  //       "$result = mysqli_query( 'query' );\n");
  // });
  test("mysql_drop_db('database_name');", () => {
    const code = "mysql_drop_db('database_name')";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_query($_GLOBALS["link1"], "DROP DATABASE "."database_name")');
  });
  test("mysql_drop_db($database_name);", () => {
    const code = "mysql_drop_db($database_name)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_query($_GLOBALS["link1"], "DROP DATABASE ".$database_name)');
  });

  test("mysql_escape_string($string)", () => {
    const code = "mysql_escape_string($string)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysql_real_escape_string($_GLOBALS["link1"], $string)');
  });

  test("mysql_client_encoding()", () => {
    const code = "mysql_client_encoding()";
    const phpCode = "<?php " + code +
      ";";
    // noinspection JSValidateTypes
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_character_set_name($_GLOBALS["link1"])');
  });

  test("mysql_list_dbs()", () => {
    const code = "mysql_list_dbs()";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_query($_GLOBALS["link1"], "SHOW DATABASES")');
  });

  test("mysql_list_processes()", () => {
    const code = "mysql_list_processes()";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe("mysqli_thread_id($_GLOBALS[\"link1\"])");
  });

  test('mysql_list_tables("dbname")', () => {
    const code = 'mysql_list_tables("dbname")';
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_query($_GLOBALS["link1"], "SHOW TABLES from "."dbname"');
  });
  test("mysql_list_tables($dbname)", () => {
    const code = 'mysql_list_tables($dbname)';
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_query($_GLOBALS["link1"], "SHOW TABLES from ".$dbname');
  });

  test("mysql_num_fields($result)", () => {
    const code = "mysql_num_fields($result)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_field_count($_GLOBALS["link1"], $result)');
  });

  test("mysql_unbuffered_query($query)", () => {
    const code = "mysql_unbuffered_query($query)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_query($_GLOBALS["link1"], $query, MYSQLI_USE_RESULT)');
  });

  test("mysql_field_len($result,5)", () => {
    const code = "mysql_field_len($result,5)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_fetch_field_direct($result, 5)->length');
  });
  test("mysql_field_name($result, 5)", () => {
    const code = "mysql_field_name($result, 5)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_fetch_field_direct($result, 5)->name');
  });
  test("mysql_field_table($result, 5)", () => {
    const code = "mysql_field_table($result, 5)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('mysqli_fetch_field_direct($result, 5)->table');
  });
  test("$fetch = mysql_fetch_field($result, 5)", ()=>{
    const code = "$fetch = mysql_fetch_field($result, 5)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(assignReplacer(tr.convert.bind(tr), node, indent, tr))
      .toBe('for($x = 0; $x < 5; $x++) {\n' +
        'mysqli_fetch_field($result);\n' +
        '}\n' +
        '$fetch = mysqli_fetch_field($result)');
  });

  test('should return false', ()=> {
      const code = "not_a_function($result, 5)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(callReplacer(tr.convert.bind(tr), node, indent, tr)).toBe(false);
  });
  test('should return false', ()=> {
      const code = "not_a_function($result, 5)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(replacer(tr.convert.bind(tr), node, indent, tr)).toBe(false);
  });
  test("should return false", () => {
    const code = "$a = not_a_function($result, 5)";
    const phpCode = "<?php " + code +
      ";";
    const file = new File(phpCode);
    const node = file.ast.children[0].expression;
    expect(replacer(tr.convert.bind(tr), node, indent, tr)).toBe(false);
  })

});
