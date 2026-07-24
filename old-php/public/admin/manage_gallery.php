<?php
require '../includes/functions.php';

// PROTEKSI LOGIN
if (!isset($_SESSION["login"])) {
    header("Location: login.php");
    exit;
}

$gallery = query("SELECT * FROM gallery ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Kelola Galeri | Admin</title>
    <link rel="shortcut icon" href="../assets/img/logo/logo-light.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../assets/css/admin-style.css">

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <style>
        /* Efek saat gambar di-hover biar ketahuan bisa diklik */
        .media-preview-trigger {
            cursor: pointer;
            transition: transform 0.2s ease, filter 0.2s ease;
        }

        .media-preview-trigger:hover {
            transform: scale(1.02);
            filter: brightness(1.1);
        }
    </style>
</head>

<body>
    <?php include '../includes/sidebar.php'; ?>

    <div class="main-content">
        <div class="container-fluid">

            <form id="formBulkDelete">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="fw-bold">Kelola Galeri Foto & Video</h3>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-outline-danger" onclick="deleteBulk()">
                            <i class="bi bi-trash-fill"></i> Hapus Terpilih
                        </button>

                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTambahFoto">
                            <i class="bi bi-plus-circle me-2"></i> Tambah File Baru
                        </button>
                    </div>
                </div>

                <div class="card border-0 shadow-sm p-4 bg-white">

                    <?php if (!empty($gallery)) : ?>
                        <div class="form-check mb-4 border-bottom pb-3">
                            <input class="form-check-input shadow-sm" type="checkbox" id="checkAll" style="transform: scale(1.3); cursor: pointer;">
                            <label class="form-check-label fw-bold ms-2" for="checkAll" style="cursor: pointer;">
                                Pilih Semua File
                            </label>
                        </div>
                    <?php endif; ?>

                    <div class="row g-4" id="galleryContainer">
                        <?php if (empty($gallery)) : ?>
                            <div class="col-12 text-center text-muted py-5" id="emptyState">
                                <i class="bi bi-images fs-1 d-block mb-2"></i>
                                Belum ada file di galeri.
                            </div>
                        <?php endif; ?>

                        <?php foreach ($gallery as $row) :
                            $ekstensi = strtolower(pathinfo($row["image"], PATHINFO_EXTENSION));
                            $isVideo = in_array($ekstensi, ['mp4', 'webm']);
                        ?>
                            <div class="col-sm-6 col-md-4 col-xl-3" id="gallery-card-<?= $row['id']; ?>">
                                <div class="card shadow-sm border-0 h-100 overflow-hidden bg-dark position-relative hover-shadow">

                                    <div class="position-absolute top-0 start-0 m-3 z-3">
                                        <input class="form-check-input item-check shadow" type="checkbox" name="selected_files[]" value="<?= $row['id']; ?>" style="transform: scale(1.5); cursor: pointer;">
                                    </div>

                                    <?php if ($isVideo): ?>
                                        <video src="../assets/img/uploads/<?= $row["image"]; ?>" class="card-img-top opacity-75 media-preview-trigger" style="height: 200px; object-fit: cover;" muted loop autoplay onclick="previewMedia('../assets/img/uploads/<?= $row['image']; ?>', true)"></video>
                                        <i class="bi bi-play-circle-fill text-white position-absolute top-50 start-50 translate-middle fs-1" style="pointer-events: none;"></i>
                                    <?php else: ?>
                                        <img src="../assets/img/uploads/<?= $row["image"]; ?>" class="card-img-top media-preview-trigger" style="height: 200px; object-fit: cover;" alt="Gallery" onclick="previewMedia('../assets/img/uploads/<?= $row['image']; ?>', false)">
                                    <?php endif; ?>

                                    <div class="card-body p-2 text-center bg-light z-1 border-top">
                                        <button type="button" class="btn btn-sm text-danger fw-medium w-100 border-0 bg-transparent" onclick="deleteSingle(<?= $row['id']; ?>)">
                                            Hapus Satuan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="modal fade" id="modalTambahFoto" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="formAddPhoto" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">Upload Foto & Video</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Pilih File (Bisa pilih banyak sekaligus)</label>
                            <input type="file" name="gambar[]" id="fileInput" accept="image/*,video/mp4,video/webm" class="form-control" multiple required onchange="cekJumlahFile(this)">
                            <small class="text-muted d-block mt-2">
                                <i class="bi bi-info-circle"></i> Tahan tombol <b>CTRL</b> untuk memilih beberapa file sekaligus. <br>
                                <span class="text-danger fw-bold">Maksimal 20 file per upload.</span>
                            </small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary">Mulai Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalPreview" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content bg-transparent border-0">
                <div class="modal-header border-0 pb-0 justify-content-end">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" style="filter: invert(1) grayscale(100%) brightness(200%); z-index: 1055; position: absolute; right: 10px; top: 10px;"></button>
                </div>
                <div class="modal-body text-center p-0 d-flex justify-content-center align-items-center" id="previewMediaContainer">
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        // -------------------------------------------------------------
        // FUNGSI PREVIEW MEDIA (GAMBAR/VIDEO)
        // -------------------------------------------------------------
        function previewMedia(src, isVideo) {
            const container = document.getElementById('previewMediaContainer');

            if (isVideo) {
                container.innerHTML = `<video src="${src}" class="img-fluid rounded-3 shadow-lg" controls autoplay style="max-height: 85vh; width: auto;"></video>`;
            } else {
                container.innerHTML = `<img src="${src}" class="img-fluid rounded-3 shadow-lg" style="max-height: 85vh; width: auto;">`;
            }

            const previewModal = new bootstrap.Modal(document.getElementById('modalPreview'));
            previewModal.show();
        }

        // Matikan video jika modal preview ditutup
        document.getElementById('modalPreview').addEventListener('hidden.bs.modal', function() {
            document.getElementById('previewMediaContainer').innerHTML = '';
        });


        function cekJumlahFile(input) {
            if (input.files && input.files.length > 20) {
                Swal.fire('Woops!', 'Maksimal upload 20 file sekaligus ya.', 'warning');
                input.value = '';
            }
        }

        // FITUR "PILIH SEMUA"
        const checkAll = document.getElementById('checkAll');
        if (checkAll) {
            checkAll.addEventListener('change', function() {
                const currentItemChecks = document.querySelectorAll('.item-check');
                currentItemChecks.forEach(function(checkbox) {
                    checkbox.checked = checkAll.checked;
                });
            });
        }

        // -------------------------------------------------------------
        // AJAX: TAMBAH FOTO BARU
        // -------------------------------------------------------------
        document.getElementById('formAddPhoto').addEventListener('submit', function(e) {
            e.preventDefault();

            const formElement = this;
            const formData = new FormData(formElement);

            const modalEl = document.getElementById('modalTambahFoto');
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance.hide();

            Swal.fire({
                title: 'Sedang Mengupload...',
                html: 'Jangan tutup halamannya ya.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            fetch('../actions/add_photo.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(res => {
                    if (res.status === 'success') {
                        const data = res.data;
                        let htmlStr = '';

                        data.forEach(row => {
                            // Tambahkan fungsi previewMedia pada elemen yang baru dibuat via AJAX
                            let mediaContent = row.isVideo ?
                                `<video src="../assets/img/uploads/${row.image}" class="card-img-top opacity-75 media-preview-trigger" style="height: 200px; object-fit: cover;" muted loop autoplay onclick="previewMedia('../assets/img/uploads/${row.image}', true)"></video>
                               <i class="bi bi-play-circle-fill text-white position-absolute top-50 start-50 translate-middle fs-1" style="pointer-events: none;"></i>` :
                                `<img src="../assets/img/uploads/${row.image}" class="card-img-top media-preview-trigger" style="height: 200px; object-fit: cover;" alt="Gallery" onclick="previewMedia('../assets/img/uploads/${row.image}', false)">`;

                            htmlStr += `
                        <div class="col-sm-6 col-md-4 col-xl-3" id="gallery-card-${row.id}">
                            <div class="card shadow-sm border-0 h-100 overflow-hidden bg-dark position-relative hover-shadow">
                                <div class="position-absolute top-0 start-0 m-3 z-3">
                                    <input class="form-check-input item-check shadow" type="checkbox" name="selected_files[]" value="${row.id}" style="transform: scale(1.5); cursor: pointer;">
                                </div>
                                ${mediaContent}
                                <div class="card-body p-2 text-center bg-light z-1 border-top">
                                    <button type="button" class="btn btn-sm text-danger fw-medium w-100 border-0 bg-transparent" onclick="deleteSingle(${row.id})">
                                        Hapus Satuan
                                    </button>
                                </div>
                            </div>
                        </div>`;
                        });

                        const emptyState = document.getElementById('emptyState');
                        if (emptyState) emptyState.remove();

                        document.getElementById('galleryContainer').insertAdjacentHTML('afterbegin', htmlStr);
                        formElement.reset();

                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: `${data.length} File masuk ke galeri.`
                        });
                    } else {
                        Swal.fire('Oops!', res.message, 'error');
                    }
                })
                .catch(err => {
                    Swal.fire('Error!', 'Gagal menghubungi server.', 'error');
                });
        });

        // -------------------------------------------------------------
        // AJAX: HAPUS SATUAN
        // -------------------------------------------------------------
        function deleteSingle(id) {
            Swal.fire({
                title: 'Yakin mau hapus?',
                text: "File ini bakal hilang selamanya dari server.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, Hapus!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`../actions/delete_photo.php?id=${id}`)
                        .then(response => response.text())
                        .then(data => {
                            if (data.includes('success')) {
                                document.getElementById(`gallery-card-${id}`).remove();
                                Swal.fire('Terhapus!', 'File berhasil dihapus.', 'success');
                            }
                        });
                }
            });
        }

        // -------------------------------------------------------------
        // AJAX: HAPUS MASSAL
        // -------------------------------------------------------------
        function deleteBulk() {
            const selected = document.querySelectorAll('.item-check:checked');
            if (selected.length === 0) {
                Swal.fire('Peringatan', 'Centang minimal satu file dulu.', 'info');
                return;
            }

            Swal.fire({
                title: `Hapus ${selected.length} file terpilih?`,
                text: "Semua data yang dicentang akan musnah.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, Hapus Semua!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const formElement = document.getElementById('formBulkDelete');
                    const formData = new FormData(formElement);
                    formData.append('action', 'bulk_delete');

                    fetch('../actions/delete_photo.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => response.text())
                        .then(data => {
                            if (data.includes('success')) {
                                selected.forEach(checkbox => {
                                    document.getElementById(`gallery-card-${checkbox.value}`).remove();
                                });
                                if (checkAll) checkAll.checked = false;
                                Swal.fire('Terhapus!', `${selected.length} file berhasil dihapus.`, 'success');
                            }
                        });
                }
            });
        }
    </script>
</body>

</html>