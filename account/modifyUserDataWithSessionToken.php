<?php
require("database.php");


$token = $_POST['token'];

echo modifyUserData("", "", $token);