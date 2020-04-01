<?php
include "link.php";

if (isset($_POST['user']) && isset($_POST['pass'])) {
    $user = $_POST['user'];
    $pass = sha1($_POST['pass']);

    $result = $link->query("select * from userinfo where username='$user' and password = '$pass' ");

    if ($result->fetch_assoc()) {
        echo true;
    } else {
        echo false;
    }
};
