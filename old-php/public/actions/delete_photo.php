<?php
require '../includes/functions.php';

if (!isset($_SESSION["login"])) {
    exit('unauthorized');
}

// 1. LOGIKA HAPUS MASSAL (Via POST)
if (isset($_POST['action']) && $_POST['action'] === 'bulk_delete') {
    if (!empty($_POST['selected_files'])) {
        foreach ($_POST['selected_files'] as $id) {
            $id = (int)$id;
            $res = mysqli_query($conn, "SELECT image FROM gallery WHERE id = $id");
            if ($res && mysqli_num_rows($res) > 0) {
                $data = mysqli_fetch_assoc($res);
                $filepath = "../assets/img/uploads/" . $data['image'];
                if (file_exists($filepath)) { 
                    unlink($filepath); 
                }
                mysqli_query($conn, "DELETE FROM gallery WHERE id = $id");
            }
        }
        echo "success";
    }
    exit;
}

// 2. LOGIKA HAPUS SATUAN (Via GET)
if (isset($_GET["id"])) {
    $id = (int)$_GET["id"];
    $res = mysqli_query($conn, "SELECT image FROM gallery WHERE id = $id");
    
    if ($res && mysqli_num_rows($res) > 0) {
        $data = mysqli_fetch_assoc($res);
        $filepath = "../assets/img/uploads/" . $data['image'];
        if (file_exists($filepath)) { 
            unlink($filepath); 
        }
        mysqli_query($conn, "DELETE FROM gallery WHERE id = $id");
        echo "success";
    }
    exit;
}
?>