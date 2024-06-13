<?php

$mysqli = new mysqli("localhost", "root", "root", "chatbotdb");

if ($mysqli->connect_error) {
    die("Verbindungsfehler: " . $mysqli->connect_error);
}

function addData($username, $email, $password) {
    global $mysqli;

    $sql = "INSERT INTO users (username, email, passwort, token, chatData, linkToPicture) VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $mysqli->prepare($sql);
    if ($stmt === false) {
        die("Fehler beim Vorbereiten der SQL-Anweisung: " . $mysqli->error);
    }
    
    $empty = ""; // oder einen anderen Standardwert oder `NULL`

    $stmt->bind_param('sssss', $username, $email, $password, $empty, $empty);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        
    } else {
        echo "Fehler beim Einfügen des Datensatzes: " . $stmt->error;
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

        } else if($token != "") {
            $sql = "SELECT * FROM users WHERE token = ?";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('s', $token);
        }
        
        if ($stmt === false) {
            die("Fehler beim Vorbereiten der SQL-Anweisung: " . $mysqli->error);
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
                'Token' => $row['token'],
                'ChatData' => $row['chatData']
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
            $stmt->bind_param('ss', $token, $userid);

        if ($stmt === false) {
            echo "Fehler beim Vorbereiten der SQL-Anweisung: " . $mysqli->error;
            return;
        }
        
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
           
        } else {
            echo "Fehler beim Aktualisieren des Datensatzes.";
        }
        $stmt->close(); 
    }
}


if (!function_exists('modifyChats')) {
    function modifyChats($data, $token) {
        global $mysqli;

            $sql = "UPDATE users SET chatData = ? WHERE token = ?";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('ss', $data, $token);

        if ($stmt === false) {
            echo "Fehler beim Vorbereiten der SQL-Anweisung: " . $mysqli->error;
            return;
        }
        
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
           
        } else {
            echo "Fehler beim Aktualisieren des Datensatzes.";
        }
        $stmt->close(); 
    }
}

function modifyUser($token, $password, $email) {
    global $mysqli;

    $sql = "UPDATE users SET passwort = ?, email = ? WHERE token = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ss', $token, $userid);

if ($stmt === false) {
    echo "Fehler beim Vorbereiten der SQL-Anweisung: " . $mysqli->error;
    return;
}

$stmt->execute();

if ($stmt->affected_rows > 0) {
   
} else {
    echo "Fehler beim Aktualisieren des Datensatzes.";
}
$stmt->close();
}
?>
