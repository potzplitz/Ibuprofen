<?php

require("database.php");

$cookievalue =  $_COOKIE['UserAuth'];

$jsondata = json_decode($cookievalue, true);

 $userid = $jsondata['userid'];

$database = getData("", $userid);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $targetDirectory = "profilepictures/";
    $targetFile = $targetDirectory . $userid . ".png";
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    $check = getimagesize($_FILES['file']['tmp_name']);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

    if ($_FILES['file']['size'] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }


    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
                modifyUser($jsondata['token'], $database -> Passwort, $database -> Email, "profilepictures/" . $userid . ".png");
        } else {

        }
    }
} else {

}

?>