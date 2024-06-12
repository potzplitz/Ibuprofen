<?php
require("database.php");

$token = $_GET['token'];

modifyChats("", $token);