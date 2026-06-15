<?php
require_once '../includes/functions.php';

if (!isset($_SESSION["login"])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = htmlspecialchars($_POST["title"]);
    $link = htmlspecialchars($_POST["link"]);
    $description = htmlspecialchars($_POST["description"]);

    $gambar = upload();

    if ($gambar) {
        $query = "INSERT INTO projects (title, description, image, link) VALUES ('$title', '$description', '$gambar', '$link')";
        if (mysqli_query($conn, $query)) {
            $newId = mysqli_insert_id($conn);
            
            // Siapkan deskripsi singkat (terpotong) untuk ditampilkan di tabel
            $shortDesc = strlen($description) > 60 ? substr($description, 0, 60) . '...' : $description;

            echo json_encode([
                'status' => 'success',
                'data' => [
                    'id' => $newId,
                    'title' => $title,
                    'image' => $gambar,
                    'description' => $shortDesc,
                    'link' => $link
                ]
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan data ke database.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Gagal mengupload gambar.']);
    }
}
?>