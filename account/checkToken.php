<?php

require("database.php");

$cookievalue =  $_COOKIE['UserAuth'];

echo

$jsondata = json_decode($cookievalue);

$userid = $jsondata['userid'];

echo getData("", $userid);

?>