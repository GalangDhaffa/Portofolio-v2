<?php
require_once '../includes/functions.php';

if (!isset($_SESSION["login"])) {
    header("Location: login.php");
    exit;
}

// Ambil data profil saat ini (ID 1)
$profile = query("SELECT * FROM profile WHERE id = 1")[0];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Edit Profil | Admin</title>
    <link rel="shortcut icon" href="../assets/img/logo/logo-light.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../assets/css/admin-style.css">

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body class="bg-light">
    <?php require '../includes/sidebar.php'; ?>

    <div class="main-content">
        <div class="container mt-5 mb-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card shadow border-0">
                        <div class="card-header bg-dark text-white">
                            <h4 class="mb-0 fw-bold"><i class="bi bi-person-lines-fill me-2"></i> Edit Foto Home & About Me</h4>
                        </div>
                        <div class="card-body p-4">

                            <form id="formEditProfile" enctype="multipart/form-data">
                                <input type="hidden" name="gambarLama" id="gambarLama" value="<?= $profile["home_image"]; ?>">

                                <div class="mb-4 text-center p-3 border rounded bg-light">
                                    <label class="form-label d-block fw-bold">Foto Home Saat Ini</label>

                                    <img src="../assets/img/uploads/<?= $profile["home_image"]; ?>" id="previewImage" width="200" class="img-thumbnail mb-3 shadow-sm" style="object-fit: cover;">

                                    <input type="file" name="gambar" id="fileInput" class="form-control" accept="image/*">
                                    <small class="text-muted d-block mt-2">Pilih foto baru jika ingin mengganti foto di halaman Home. Kosongkan jika tidak ingin ganti.</small>
                                </div>

                                <div class="mb-4">
                                    <label for="about_text" class="form-label fw-bold">Teks About Me</label>
                                    <textarea name="about_text" id="about_text" class="form-control" rows="8" required><?= $profile["about_text"]; ?></textarea>
                                </div>

                                <div class="d-flex justify-content-between mt-4">
                                    <a href="dashboard.php" class="btn btn-secondary px-4">Kembali</a>
                                    <button type="submit" class="btn btn-primary px-4 fw-bold"><i class="bi bi-save me-1"></i> Simpan Perubahan</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        document.getElementById('formEditProfile').addEventListener('submit', function(e) {
            e.preventDefault(); // Cegah halaman reload

            const formData = new FormData(this);

            Swal.fire({
                title: 'Menyimpan Perubahan...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            fetch('../actions/update_profile.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(res => {
                    if (res.status === 'success') {
                        // Update gambar di layar kalau ada gambar baru
                        document.getElementById('previewImage').src = `../assets/img/uploads/${res.new_image}`;

                        // Update value hidden input supaya kalau di-save lagi nggak error
                        document.getElementById('gambarLama').value = res.new_image;

                        // Kosongin input file biar rapi lagi
                        document.getElementById('fileInput').value = '';

                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: 'Profil lu udah update dengan sukses.',
                            confirmButtonColor: '#3b82f6'
                        });
                    } else {
                        Swal.fire('Oops!', res.message, 'error');
                    }
                })
                .catch(error => {
                    Swal.fire('Error', 'Gagal menghubungi server.', 'error');
                });
        });
    </script>
</body>

</html>