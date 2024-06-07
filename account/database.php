<?php

$mysqli = new mysqli("localhost", "root", "root", "chatbotdb");

if ($mysqli->connect_error) {
    die("Verbindungsfehler: " . $mysqli->connect_error);
}

function addData($username, $email, $password) {
    global $mysqli;

    $sql = "INSERT INTO users (username, email, passwort, token) VALUES (?, ?, ?, ?)";
    
    $stmt = $mysqli->prepare($sql);
    $token = ""; // oder einen anderen Standardwert oder `NULL`
    $stmt->bind_param('ssss', $username, $email, $password, $token);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Datensatz erfolgreich eingefügt!";
    } else {
        echo "Fehler beim Einfügen des Datensatzes.";
    }

    $stmt->close(); 
}


if (!function_exists('getData')) {
    function getData($email, $userid) {
        global $mysqli;

        if($email != "") {
            $sql = "SELECT * FROM users WHERE email = ?";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('s', $email);

        } else if($userid != "") {
            $sql = "SELECT * FROM users WHERE userID = ?";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('s', $userid);

        }
    
        
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
                'Username' => $row['username'],
                'Token' => $row['token']
            );
        } else {
            return "notFound";  
        }
        $stmt->close();
    }
    }



    if (!function_exists('modifyUserData')) {
        function modifyUserData($userid, $token) {
            global $mysqli;
        
            $sql = "UPDATE users SET token = ? WHERE userID = ?";
        
            $stmt = $mysqli->prepare($sql);
        
            if ($stmt === false) {
                echo "Fehler beim Vorbereiten der SQL-Anweisung: " . $mysqli->error;
                return;
            }
        
            $stmt->bind_param('ss', $token, $userid);
        
            $stmt->execute();
        
            if ($stmt->affected_rows > 0) {
            } else {
                echo "Fehler beim Aktualisieren des Datensatzes.";
            }
            $stmt->close(); 
        }
        }


?>