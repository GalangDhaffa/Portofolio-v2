<?php 
require_once '../includes/functions.php';

if (!isset($_SESSION["login"])) { exit('unauthorized'); }

if (isset($_GET["id"])) {
    $id = (int)$_GET["id"];

    $res = mysqli_query($conn, "SELECT image FROM projects WHERE id = $id");
    if ($res && mysqli_num_rows($res) > 0) {
        $data = mysqli_fetch_assoc($res);
        $filepath = "../assets/img/uploads/" . $data['image'];
        
        if (file_exists($filepath) && !empty($data['image'])) {
            unlink($filepath);
        }

        mysqli_query($conn, "DELETE FROM projects WHERE id = $id");
        echo "success";
    }
}
?>