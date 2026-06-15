<?php
require_once '../includes/functions.php';

// PROTEKSI LOGIN
if (!isset($_SESSION["login"])) {
    header("Location: login.php");
    exit;
}

$skills = query("SELECT * FROM skills ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Kelola Skill | Admin</title>
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
                <h3 class="fw-bold">Kelola Skill</h3>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTambahSkill">
                    <i class="bi bi-plus-circle me-2"></i> Tambah Skill
                </button>
            </div>

            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-dark">
                                <tr>
                                    <th>Ikon/Logo</th>
                                    <th>Nama Skill</th>
                                    <th>Deskripsi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="skillTableBody">
                                <?php if (empty($skills)) : ?>
                                    <tr id="emptyState">
                                        <td colspan="4" class="text-center text-muted py-4">Belum ada skill yang ditambahkan.</td>
                                    </tr>
                                <?php endif; ?>

                                <?php foreach ($skills as $s) : ?>
                                    <tr id="skill-row-<?= $s['id']; ?>">
                                        <td><img src="../assets/img/uploads/<?= $s['image']; ?>" width="50" class="rounded shadow-sm"></td>
                                        <td><strong><?= $s['name']; ?></strong></td>
                                        <td><?= $s['description']; ?></td>
                                        <td>
                                            <button type="button" class="btn btn-danger btn-sm" onclick="deleteSkill(<?= $s['id']; ?>)">
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

    <div class="modal fade" id="modalTambahSkill" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="formAddSkill" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">Tambah Skill Baru</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Nama Skill</label>
                            <input type="text" name="name" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Ikon/Logo</label>
                            <input type="file" name="gambar" class="form-control" accept="image/*" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Deskripsi</label>
                            <textarea name="description" class="form-control" placeholder="Deskripsi skill (Opsional)"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary">Simpan Skill</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        // --- AJAX: TAMBAH SKILL ---
        document.getElementById('formAddSkill').addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const modalEl = document.getElementById('modalTambahSkill');
            const modalInstance = bootstrap.Modal.getInstance(modalEl);

            modalInstance.hide(); // Tutup modal

            Swal.fire({
                title: 'Menyimpan...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            fetch('../actions/add_skill.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(res => {
                    if (res.status === 'success') {
                        const data = res.data;

                        // Bikin format HTML (tr) baru untuk disuntik ke tabel
                        const newRow = `
                        <tr id="skill-row-${data.id}">
                            <td><img src="../assets/img/uploads/${data.image}" width="50" class="rounded shadow-sm"></td>
                            <td><strong>${data.name}</strong></td>
                            <td>${data.description}</td>
                            <td>
                                <button type="button" class="btn btn-danger btn-sm" onclick="deleteSkill(${data.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;

                        // Hapus tulisan "Belum ada skill" kalau ada
                        const emptyState = document.getElementById('emptyState');
                        if (emptyState) emptyState.remove();

                        // Suntik baris baru ke posisi paling atas tabel
                        document.getElementById('skillTableBody').insertAdjacentHTML('afterbegin', newRow);

                        // Bersihkan form inputan
                        document.getElementById('formAddSkill').reset();

                        Swal.fire('Berhasil!', 'Skill baru sukses ditambahkan.', 'success');
                    } else {
                        Swal.fire('Gagal!', res.message, 'error');
                    }
                })
                .catch(err => Swal.fire('Error!', 'Gagal menghubungi server.', 'error'));
        });

        // --- AJAX: HAPUS SKILL ---
        function deleteSkill(id) {
            Swal.fire({
                title: 'Yakin mau hapus?',
                text: "Skill ini bakal terhapus dari portofolio lu.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, Hapus!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`../actions/delete_skill.php?id=${id}`)
                        .then(response => response.text())
                        .then(data => {
                            if (data.includes('success')) {
                                // Hapus baris tabel dari layar secara instan
                                document.getElementById(`skill-row-${id}`).remove();
                                Swal.fire('Terhapus!', 'Skill berhasil dihapus.', 'success');
                            }
                        });
                }
            });
        }
    </script>
</body>

</html>