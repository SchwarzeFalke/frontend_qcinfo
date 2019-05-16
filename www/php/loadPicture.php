<?php

$code = $_GET["code"];

$con = mysqli_connect("localhost", "id9455940_bdqcinfo", "123456", "id9455940_bdqcinfo");

$sql = "SELECT profile_pic FROM Usuarios WHERE Codigo = $code";
$retval = (mysqli_query($con, $sql));

$i = 0;
$rawdata = array();

if (mysqli_num_rows($retval) > 0) {
    while ($row = mysqli_fetch_array($retval)) {
        $rawdata[$i] = base64_encode($row);
        $i++;
    }
}
echo json_encode($rawdata);

mysqli_close($con);
