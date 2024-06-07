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

if (!function_exists('getData')) {
    function getData($email, $password) {
        global $mysqli;
    
        $sql = "SELECT * FROM users WHERE email = ?";
    
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        
        $result = $stmt->get_result();
    
        if (!$result) {
            echo $mysqli->error;
            return false;
        }
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return (object) array(
                'Email' => $row['email'],
                'Passwort' => $row['passwort'],
                'UserID' => $row['userID'],
                'Username' => $row['username']
            );
        } else {
            return "notFound";  
        }
        $stmt->close();
    }
    }


?>