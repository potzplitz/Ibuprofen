<?php

require("database.php");

$cookievalue =  $_COOKIE['UserAuth'];

$jsondata = json_decode($cookievalue, true);

$userid = $jsondata['userid'];
$token = $jsondata['token'];

$databaseToken = getData("", $userid);

if($token == $databaseToken -> Token) {

    $tokenNew = bin2hex(random_bytes(32));
    $data = array("token" => $tokenNew, "userid" => $userid);

    setcookie('UserAuth', json_encode($data), time() + (10 * 365 * 24 * 60 * 60), '/', '');

    modifyUserData($jsondata['userid'], $tokenNew);

    echo json_encode($databaseToken);


    // benutzerdaten laden

} else {

    // token nicht gültig, login nicht gestattet
    echo "invalid";

}

?>