<?php

require("../account/database.php");

$json = $_POST['data'];
$token = $_POST['token'];

modifyChats($json, $token);



?>