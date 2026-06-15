<?php
require_once '../includes/functions.php';

// Pastikan hanya admin yang bisa akses
if (!isset($_SESSION["login"])) {
  echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $about_text = mysqli_real_escape_string($conn, $_POST["about_text"]);
  $gambarLama = $_POST["gambarLama"];

  $gambar = $gambarLama; // Default pakai gambar lama

  // Cek apakah user upload gambar baru (error 4 artinya tidak ada file yang diupload)
  if ($_FILES['gambar']['error'] !== 4) {
    $gambarBaru = upload();
    if (!$gambarBaru) {
      echo json_encode(['status' => 'error', 'message' => 'Gagal mengupload foto baru. Pastikan format/ukuran sesuai.']);
      exit;
    }
    $gambar = $gambarBaru;

    // Hapus foto lama di folder uploads agar tidak numpuk
    if (file_exists("../assets/img/uploads/" . $gambarLama) && $gambarLama != '') {
      unlink("../assets/img/uploads/" . $gambarLama);
    }
  }

  $query = "UPDATE profile SET 
                home_image = '$gambar',
                about_text = '$about_text'
              WHERE id = 1";

  if (mysqli_query($conn, $query)) {
    // Balikin respons sukses beserta nama gambar terbaru buat di-update di layar
    echo json_encode([
      'status' => 'success',
      'new_image' => $gambar
    ]);
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan perubahan ke database.']);
  }
}
