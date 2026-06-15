<?php 
require_once '../includes/functions.php';

// Pastikan hanya admin yang bisa akses
if (!isset($_SESSION["login"])) { exit('unauthorized'); }

if (isset($_GET["id"])) {
    $id = (int)$_GET["id"];

    // Langsung hapus dari database karena tidak ada file fisik yang nyangkut
    if (mysqli_query($conn, "DELETE FROM messages WHERE id = $id")) {
        echo "success";
    } else {
        echo "error";
    }
}
?>