<?php

require_once './dbInfo.php';

$con = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_DATABASE);

// if($con){
//     echo 'Done';
// }else{
//     echo $con;
// }