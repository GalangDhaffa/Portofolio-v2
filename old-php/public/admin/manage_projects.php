<?php
require_once '../includes/functions.php';

// PROTEKSI LOGIN
if (!isset($_SESSION["login"])) {
    header("Location: login.php");
    exit;
}

$projects = query("SELECT * FROM projects ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Kelola Proyek | Admin</title>
    <link rel="shortcut icon" href="../assets/img/logo/logo-light.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../assets/css/admin-style.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
    <?php include '../includes/sidebar.php'; ?>

    <div class="main-content">
        <div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="fw-bold">Kelola Proyek</h3>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTambahProyek">
                    <i class="bi bi-plus-circle me-2"></i> Tambah Proyek
                </button>
            </div>

            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-dark">
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Judul</th>
                                    <th>Deskripsi</th>
                                    <th>Link</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="projectTableBody">
                                <?php if (empty($projects)) : ?>
                                    <tr id="emptyState">
                                        <td colspan="5" class="text-center text-muted py-4">Belum ada proyek yang ditambahkan.</td>
                                    </tr>
                                <?php endif; ?>

                                <?php foreach ($projects as $p) : ?>
                                    <tr id="project-row-<?= $p['id']; ?>">
                                        <td><img src="../assets/img/uploads/<?= $p['image']; ?>" width="80" class="rounded border shadow-sm"></td>
                                        <td><strong><?= $p['title']; ?></strong></td>
                                        <td><?= strlen($p['description']) > 60 ? substr($p['description'], 0, 60) . '...' : $p['description']; ?></td>
                                        <td><a href="<?= $p['link']; ?>" target="_blank" class="btn btn-sm btn-outline-info">Demo</a></td>
                                        <td>
                                            <button type="button" class="btn btn-danger btn-sm" onclick="deleteProject(<?= $p['id']; ?>)">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalTambahProyek" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="formAddProject" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">Tambah Proyek Baru</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Judul Proyek</label>
                            <input type="text" name="title" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Link Demo (URL)</label>
                            <input type="url" name="link" class="form-control" placeholder="https://..." required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Deskripsi</label>
                            <textarea name="description" class="form-control" rows="3" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Thumbnail (Gambar)</label>
                            <input type="file" name="gambar" accept="image/*" class="form-control" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary">Simpan Proyek</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        // --- AJAX: TAMBAH PROYEK ---
        document.getElementById('formAddProject').addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const modalEl = document.getElementById('modalTambahProyek');
            const modalInstance = bootstrap.Modal.getInstance(modalEl);

            modalInstance.hide(); // Tutup modal

            Swal.fire({
                title: 'Mengupload...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            fetch('../actions/add_project.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(res => {
                    if (res.status === 'success') {
                        const data = res.data;

                        // Bangun HTML baris baru
                        const newRow = `
                        <tr id="project-row-${data.id}">
                            <td><img src="../assets/img/uploads/${data.image}" width="80" class="rounded border shadow-sm"></td>
                            <td><strong>${data.title}</strong></td>
                            <td>${data.description}</td>
                            <td><a href="${data.link}" target="_blank" class="btn btn-sm btn-outline-info">Demo</a></td>
                            <td>
                                <button type="button" class="btn btn-danger btn-sm" onclick="deleteProject(${data.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;

                        // Hilangkan baris "Belum ada proyek" jika ada
                        const emptyState = document.getElementById('emptyState');
                        if (emptyState) emptyState.remove();

                        // Suntik baris baru ke paling atas
                        document.getElementById('projectTableBody').insertAdjacentHTML('afterbegin', newRow);

                        // Reset input
                        document.getElementById('formAddProject').reset();

                        Swal.fire('Berhasil!', 'Proyek baru sukses ditambahkan.', 'success');
                    } else {
                        Swal.fire('Gagal!', res.message, 'error');
                    }
                })
                .catch(err => Swal.fire('Error!', 'Gagal menghubungi server.', 'error'));
        });

        // --- AJAX: HAPUS PROYEK ---
        function deleteProject(id) {
            Swal.fire({
                title: 'Yakin mau hapus?',
                text: "Proyek ini bakal hilang dari portofolio lu.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, Hapus!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`../actions/delete_project.php?id=${id}`)
                        .then(response => response.text())
                        .then(data => {
                            if (data.includes('success')) {
                                // Hapus elemen TR dari layar secara instan
                                document.getElementById(`project-row-${id}`).remove();
                                Swal.fire('Terhapus!', 'Proyek berhasil dihapus.', 'success');
                            }
                        });
                }
            });
        }
    </script>
</body>

</html>