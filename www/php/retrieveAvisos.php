<?php

// Establish database connection
$con = mysqli_connect("localhost", "id9455940_bdqcinfo", "123456", "id9455940_bdqcinfo");

$sql = "SELECT * FROM Avisos WHERE fecha = CURRENT_DATE()";

$retval = (mysqli_query($con, $sql));

$i = 0;
$rawdata = array();
if (mysqli_num_rows($retval) > 0) {
    while ($row = mysqli_fetch_array($retval)) {
        $rawdata[$i] = $row;
        $i++;
    }
} else {echo "0";}

echo json_encode($rawdata);

mysqli_close($con);