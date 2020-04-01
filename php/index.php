<?php
include "link.php";

$search = $link->query("select * from goodslist");
$arr = array();
for($i=0;$i<5;$i++){
    $arr[$i] = $search->fetch_assoc();
};
echo json_encode($arr);