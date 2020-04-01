<?php

include "link.php";

if (isset($_GET['xingming'])) {
    $xingming = $_GET['xingming'];
    $result = $link->query("select * from userinfo where username = '$xingming'");
    if ($result->fetch_assoc()) { 
        echo true; 
    } else { 
        echo false;  
    }
};

if (isset($_GET['youxiang'])) {
    $youxiang = $_GET['youxiang'];
    $result = $link->query("select * from userinfo where email = '$youxiang'");
    if ($result->fetch_assoc()) { 
        echo true; 
    } else { 
        echo false;  
    }
};

if (isset($_POST['submit'])) {
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    $email = $_POST['email'];

    $link->query("insert userinfo values(null,'$user','$pass','$email',NOW())");
    header('location:http://localhost/xiangmu/src/html/login.html');
}
