<?php

$code = $_GET["code"];
$image = $_GET["image"];

$con = mysqli_connect("localhost", "id9455940_bdqcinfo", "123456", "id9455940_bdqcinfo");

$sql = "UPDATE Usuarios SET profile_pic = '$image' WHERE Codigo = $code";
if (mysqli_query($con, $sql)) {
    echo "Data has been successfully recorded!";
} else {
    echo "Data has not been recorded!";
}

mysqli_close($con);
