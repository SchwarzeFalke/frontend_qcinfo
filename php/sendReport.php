<?php

// Load page variables 
$code = $_GET['code'];
$subject = $_GET['subject'];
$descrpt = $_GET['descrpt'];

// Establish database connection
$con = mysqli_connect("localhost", "id9455940_bdqcinfo", "1403976", "id9455940_bdqcinfo");
$sql = "INSERT INTO dataRecord (code, pass, name, email) VALUES ('$num','$password','$name','$email')";
if (mysqli_query($con, $sql)) {
    echo "Data has been successfully recorded!";
} else {
    echo "Data has not been recorded!";
}

mysqli_close($con);
