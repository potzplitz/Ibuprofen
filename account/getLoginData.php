<?php

require("database.php");

$email = $_POST['email'];
$password = $_POST['password'];

$jsondata = getData($email, "");

echo "jsondata: " . $jsondata;

if($jsondata -> Passwort == $password) {
    setUserCookie($jsondata -> UserID);
    echo true;
} else {
    echo false;
}


function setUserCookie($userid) {

    global $jsondata;

    $token = bin2hex(random_bytes(32));
    $data = array("token" => $token, "userid" => $userid);

    modifyUserData($jsondata -> UserID, $token);

    setcookie('UserAuth', json_encode($data), time() + (10 * 365 * 24 * 60 * 60), '/', '', true, true);
}


?>