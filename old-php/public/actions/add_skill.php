<?php
require_once '../includes/functions.php';

if (!isset($_SESSION["login"])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = htmlspecialchars($_POST["name"]);
    $description = isset($_POST["description"]) ? htmlspecialchars($_POST["description"]) : '';

    // Gunakan fungsi upload yang sudah ada di functions.php
    $gambar = upload();

    if ($gambar) {
        $query = "INSERT INTO skills (name, image, description) VALUES ('$name', '$gambar', '$description')";
        if (mysqli_query($conn, $query)) {
            $newId = mysqli_insert_id($conn);
            
            // Kembalikan data dalam bentuk JSON agar JS bisa merender baris baru di tabel
            echo json_encode([
                'status' => 'success',
                'data' => [
                    'id' => $newId,
                    'name' => $name,
                    'image' => $gambar,
                    'description' => $description
                ]
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan data ke database.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Gagal mengupload gambar. Pastikan format/ukuran sesuai.']);
    }
}
?>