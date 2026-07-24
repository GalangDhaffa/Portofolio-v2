<?php
require_once '../includes/functions.php';

// PROTEKSI LOGIN
if (!isset($_SESSION["login"])) {
    header("Location: login.php");
    exit;
}

// Ambil semua pesan masuk dari database
$messages = query("SELECT * FROM messages ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pesan Masuk | Admin</title>
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
            <div class="mb-4">
                <h3 class="fw-bold">Pesan Masuk</h3>
                <p class="text-muted">Daftar pesan dari pengunjung website melalui form Contact.</p>
            </div>

            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-dark">
                                <tr>
                                    <th>No.</th>
                                    <th>Nama Pengirim</th>
                                    <th>Email</th>
                                    <th>Isi Pesan</th>
                                    <th>Waktu Kirim</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="messageTableBody">
                                <?php if(empty($messages)) : ?>
                                    <tr id="emptyState"><td colspan="6" class="text-center text-muted py-4">Belum ada pesan masuk.</td></tr>
                                <?php endif; ?>
                                
                                <?php $i = 1; foreach ($messages as $msg) : ?>
                                <tr id="msg-row-<?= $msg['id']; ?>">
                                    <td><?= $i++; ?></td>
                                    <td><strong><?= $msg['name']; ?></strong></td>
                                    <td><a href="mailto:<?= $msg['email']; ?>" class="text-decoration-none"><?= $msg['email']; ?></a></td>
                                    <td style="max-width: 300px;"><?= nl2br($msg['message']); ?></td>
                                    <td><small class="text-muted"><?= $msg['created_at']; ?></small></td>
                                    <td>
                                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteMessage(<?= $msg['id']; ?>)">
                                            <i class="bi bi-trash"></i> Hapus
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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        function deleteMessage(id) {
            Swal.fire({
                title: 'Hapus pesan ini?',
                text: "Pesan yang dihapus nggak bisa dikembalikan lagi.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, Hapus!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`../actions/delete_message.php?id=${id}`)
                    .then(response => response.text())
                    .then(data => {
                        if(data.includes('success')) {
                            // Hapus baris secara instan dari layar
                            document.getElementById(`msg-row-${id}`).remove();
                            
                            // Cek jika tabel kosong setelah dihapus, tampilkan tulisan "Belum ada pesan"
                            const tbody = document.getElementById('messageTableBody');
                            if (tbody.children.length === 0) {
                                tbody.innerHTML = '<tr id="emptyState"><td colspan="6" class="text-center text-muted py-4">Belum ada pesan masuk.</td></tr>';
                            }

                            Swal.fire('Terhapus!', 'Pesan berhasil dibuang.', 'success');
                        } else {
                            Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus pesan.', 'error');
                        }
                    })
                    .catch(error => {
                        Swal.fire('Error', 'Gagal menghubungi server.', 'error');
                    });
                }
            });
        }
    </script>
</body>
</html>