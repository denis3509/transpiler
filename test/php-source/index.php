include("./dbconnection.php")
$query = "SELECT account.*, country.*
 FROM account, country
 WHERE country.name = 'Portugal'
 AND account.country_id = country.id";
$result = mysqli_query($GLOBALS['link1'], $query);
for ($i = 0; $i < mysqli_num_fields($result); ++$i) {
    $name = mysql_field_name( $result, $i);

    $table = mysql_field_table( $result, $i);

    echo  "$table: $field\n";
}



