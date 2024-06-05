<?php

require("database.php");

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

addToDatabase($username, $email, $password);

function addToDatabase($username, $email, $password) {
    addData($username, $email, $password);
}

?>