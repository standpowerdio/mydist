<?php
header('content-type:text/html;charset=utf-8');

define('HOST', 'localhost');
define('USERNAME', 'root'); 
define('PASSWORD', ''); 
define('DBNAME', 'goods'); 

$link = new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
if($link->connect_error){
    die('11111'.$link->connect_error);
};