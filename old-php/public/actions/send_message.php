<?php
require '../includes/functions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = htmlspecialchars($_POST["nama"]);
    $email = htmlspecialchars($_POST["email"]);
    $pesan = htmlspecialchars($_POST["pesan"]);

    $query = "INSERT INTO messages (name, email, message) VALUES ('$nama', '$email', '$pesan')";
    mysqli_query($conn, $query);
    
    echo "success"; // Cuma kirim respon sederhana
}
?>