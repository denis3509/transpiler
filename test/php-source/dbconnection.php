
<?php
$mysql_hostname = "localhost";
$mysql_user = "root";
$mysql_password = "12345";
$dbname = "company"
$link = mysql_connect($mysql_hostname,
 $mysql_user,
 $mysql_password,
 $dbname);
if (!$link) {
    die('Ошибка соединения: ' . mysql_error());
}



