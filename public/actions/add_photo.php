<?php
require '../includes/functions.php';

// Pastikan hanya admin yang bisa akses
if (!isset($_SESSION["login"])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

// Deteksi error jika file terlalu besar dari batas server
if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST) && empty($_FILES) && $_SERVER['CONTENT_LENGTH'] > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Total ukuran file melebihi batas server! Maksimal 500MB.']);
    exit;
}

if (isset($_FILES['gambar'])) {
    $jumlah_file = count($_FILES['gambar']['name']);
    
    if ($jumlah_file > 20) {
        echo json_encode(['status' => 'error', 'message' => 'Maksimal upload 20 file sekaligus!']);
        exit;
    }

    // Panggil fungsi upload_multiple yang sudah lu buat di functions.php
    $files = upload_multiple();
    $uploadedData = [];

    if (!empty($files)) {
        foreach ($files as $file) {
            mysqli_query($conn, "INSERT INTO gallery (image) VALUES ('$file')");
            $newId = mysqli_insert_id($conn); // Ambil ID yang baru saja dibuat
            
            // Cek apakah ini video atau foto untuk dirender di Frontend
            $ekstensi = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            $isVideo = in_array($ekstensi, ['mp4', 'webm']);
            
            $uploadedData[] = [
                'id' => $newId,
                'image' => $file,
                'isVideo' => $isVideo
            ];
        }
        
        // Kirim respon sukses beserta data file baru ke JavaScript
        echo json_encode(['status' => 'success', 'data' => $uploadedData]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Gagal mengupload file. Pastikan format sesuai.']);
    }
}
?>