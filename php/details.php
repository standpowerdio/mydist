<?php
include "link.php";
if($_POST['sid']){
    $sid = $_POST['sid'];
}else{
    $sid = 0;
};
$search = $link->query("select * from goodslist where sid=$sid");
$res = $search->fetch_assoc();
if($res){
    echo json_encode($res);
}else{
    $search1 = $link->query("select * from goodslist where sid=0");
    echo json_encode($search1->fetch_assoc());
};
