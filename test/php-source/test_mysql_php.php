<?php
ip2long('192.168.0.1');
get_class(Person);
get_parent_class(Person);

mysql_connect('localhost', 'my_user', 'my_password');

mysql_connect('localhost', 'my_user', 'my_password', 'db_name');

mysql_connect('localhost:8080', 'my_user', 'my_password', 'db_name');

$data = mysql_db_name($result, $row);

$mysql_hostname = "localhost";
$mysql_user = "root";
$mysql_password = "12345";
$dbname = "company";
$link = mysql_connect($mysql_hostname,
    $mysql_user,
    $mysql_password);
if (!$link) {
    echo mysqli_errno($link) . ": " . mysql_error($link). "\n";
}
$db = mysql_select_db($dbname);
if (!$db) {
    echo mysql_errno() . ": " . mysql_error(). "\n";
}

printf("Тип соединения с MySQL: %s\n", mysql_get_host_info());
printf("Версия протокола MySQL: %s\n", mysql_get_proto_info());
printf("Версия сервера MySQL: %s\n", mysql_get_server_info());

?>