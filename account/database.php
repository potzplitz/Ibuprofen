<?php

$mysqli = new mysqli("localhost", "root", "root", "chatbotdb");

if ($mysqli->connect_error) {
    die("Verbindungsfehler: " . $mysqli->connect_error);
}

function addData($username, $email, $password) {

    global $mysqli;

    $sql = "INSERT INTO users (username, email, passwort) VALUES (?, ?, ?)";
    
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('sss', $username, $email, $password);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Datensatz erfolgreich eingefügt!";
    } else {
        echo "Fehler beim Einfügen des Datensatzes.";
    }

    $stmt->close(); 
}

function getData($email, $password);


?>