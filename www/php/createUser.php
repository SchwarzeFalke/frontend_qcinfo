<?php

// Load page variables
$userCode = $_GET['userCode'];
$name = $_GET['name'];
$career = $_GET['career'];
$tempPrivileges = $_GET['privileges'];
$privileges = TRUE;
if ($tempPrivileges == "0") {
    $privileges = FALSE;
}

// Establish database connection
$con = mysqli_connect("localhost", "id9455940_bdqcinfo", "123456", "id9455940_bdqcinfo");

$sql_search = "SELECT Codigo FROM Usuarios WHERE Codigo = $userCode";
$retval = (mysqli_query($con, $sql_));

if (mysqli_num_rows($retval) > 0) {
    echo "0";
} else {
    $sql = "INSERT INTO Usuarios (Codigo, Nombre, Carrera, privileges) VALUES ('$userCode', '$name','$career','$privileges')";
    if (mysqli_query($con, $sql)) {
        echo "Data has been successfully recorded!";
    } else {
        echo "Data has not been recorded!";
    }
}

mysqli_close($con);
