<?php

function getDB()
{
    $host = "";
    $dbname = "postgres";
    $user = "postgres";
    $password = "";

    try {
        $db = new PDO(
            "pgsql:host=$host;port=5432;dbname=$dbname;user=$user;password=$password"
        );
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        exit;
    }
}
