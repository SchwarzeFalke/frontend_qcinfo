<?php

// Load page variables
$userCode = $_GET['userCode'];
$subject = $_GET['subject'];
$tempDate = $_GET['date'];
$date = date("Y-m-d", strtotime($tempDate));
$content = $_GET['content'];
$type = $_GET['type'];

// Establish database connection
$con = mysqli_connect("localhost", "id9455940_bdqcinfo", "123456", "id9455940_bdqcinfo");

$sql = "INSERT INTO Avisos (asunto, fecha, contenido, urgencia, IdUsuarios) VALUES ('$subject', '$date','$content','$type','$userCode')";
if (mysqli_query($con, $sql)) {
    echo "Data has been successfully recorded!";
} else {
    echo "Data has not been recorded!";
}

mysqli_close($con);
