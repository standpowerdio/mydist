<?php
include "link.php";
$search = $link->query("select * from goodslist");
$arr = array();
for($i=0;$i<$search->num_rows;$i++){
    $arr[$i] = $search->fetch_assoc();
};
echo json_encode($arr);