<?php

require("database.php");

$email = $_POST['email'];
$password = $_POST['password'];

echo json_encode(getData($email, $password));

?>