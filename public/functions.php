<?php 
// koneksi db
$conn = mysqli_connect("localhost", "root", "", "portofolio_v2");

// ambil data
$result = mysqli_query($conn, "SELECT * FROM gallery");

$gallery = mysqli_fetch_row($result);


?>
