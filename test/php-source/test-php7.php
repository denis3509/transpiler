<?php
$c = new C;
mcrypt_generic_end();
mcrypt_ecb();
mcrypt_cbc();
mcrypt_cfb();
mcrypt_ofb();
set_magic_quotes_runtime();
magic_quotes_runtime();
set_socket_blocking();

$a = 5;


list($a[], $a[], $a[]) = [1, 2, 3];
$array = array(1,2,3);
foreach ($array as &$val)  {
    var_dump(&$val);
}

$b = "\u{xyz}";


?>