<?php
include "link.php";
$pagesize = 20;

$sql = "select * from goodslist";
$result = $link->query($sql);

$num = $result->num_rows;

$pagenum = ceil($num / $pagesize);


if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}

$page = ($pagevalue - 1) * $pagesize;


$sql1 = "select * from goodslist limit $page,$pagesize";
$res = $link->query($sql1);


$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);
