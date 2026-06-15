<?php
require "includes/functions.php";

$galleries = query("SELECT * FROM gallery ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="en" data-bs-theme="light">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gallery | Dhaffa Galang Fahriza</title>

  <link rel="shortcut icon" href="assets/img/logo/logo.png" type="image/x-icon">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/output.css">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100..700&display=swap" rel="stylesheet">

  <style>
    /* SAMAKAN WARNA BACKGROUND DENGAN INDEX */
    [data-bs-theme="light"] {
      --bs-body-bg: #f4f4f5;
      --bs-tertiary-bg: #e4e4e7;
    }

    /* EFEK HOVER MELAYANG (Biar ga flat) */
    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card-hover:hover {
      transform: translateY(-8px);
      box-shadow: 0 1rem 3rem rgba(0, 0, 0, .15) !important;
    }

    [data-bs-theme="light"] .masonry-item {
      background-color: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    [data-bs-theme="dark"] .masonry-item {
      background-color: #121212;
    }

    .gallery-container h1 {
      text-align: center;
      margin-top: 50px;
      font-weight: bold;
    }

    .gallery-container p.page-description {
      text-align: center;
      margin: 25px auto;
      font-size: 18px;
      color: #999;
    }

    .tz-gallery {
      padding: 40px 0;
    }

    /* MASONRY RESPONSIVE (4 Baris Ringkas & Berjarak) */
    .masonry-grid {
      column-count: 1;
      column-gap: 1.5rem;
    }

    @media (min-width: 576px) {
      .masonry-grid {
        column-count: 2;
      }
    }

    @media (min-width: 992px) {
      .masonry-grid {
        column-count: 3;
      }
    }

    @media (min-width: 1200px) {
      .masonry-grid {
        column-count: 4;
      }
    }

    /* Jarak Vertikal Antar Item Galeri */
    .masonry-item {
      break-inside: avoid;
      margin-bottom: 1.5rem;
      /* Memberikan jarak bawah antar card */
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      cursor: pointer;
    }

    .masonry-item .gallery-img {
      width: 100%;
      display: block;
      transition: transform 0.4s ease;
      opacity: 0.9;
    }

    /* OVERLAY */
    .masonry-item .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .masonry-item:hover .overlay {
      opacity: 1;
    }

    .masonry-item:hover .gallery-img {
      transform: scale(1.05);
      opacity: 1;
    }

    .search-icon {
      color: white;
      font-size: 3rem;
      transform: translateY(20px);
      transition: transform 0.3s ease;
    }

    .masonry-item:hover .search-icon {
      transform: translateY(0);
    }

    /* WATERMARK FOTO */
    .watermark-logo {
      position: absolute;
      bottom: 15px;
      right: 15px;
      width: 45px;
      opacity: 0.6;
      pointer-events: none;
      z-index: 2;
      filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.8));
    }

    .modal-backdrop.show {
      opacity: 0.95;
    }

    .modal-body {
      position: relative;
      display: inline-block;
    }

    .btn-close-custom {
      position: absolute;
      top: -15px;
      right: -15px;
      background-color: white;
      color: #000;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 20;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s, background-color 0.2s;
    }

    .btn-close-custom:hover {
      background-color: #f8f9fa;
      transform: scale(1.1);
    }

    #popupImage {
      max-height: 85vh;
      width: auto;
      object-fit: contain;
      margin: 0 auto;
    }
  </style>
</head>

<body style="font-family: 'Josefin Sans', sans-serif;">
  <?php include 'includes/header.php'; ?>

  <div class="container px-4 py-5 gallery-container mt-5 min-vh-100">
    <h1>Gallery & Media</h1>
    <p class="page-description text-center">© By Dhaffa Galang Fahriza</p>

    <div class="tz-gallery">
      <?php if (empty($galleries)): ?>
        <p class="text-center w-100">Belum ada file yang ditambahkan ke galeri.</p>
      <?php else: ?>

        <div class="masonry-grid">
          <?php foreach ($galleries as $gal) :
            $ekstensi = strtolower(pathinfo($gal["image"], PATHINFO_EXTENSION));
            $isVideo = in_array($ekstensi, ['mp4', 'webm']);
            $tipeFile = $isVideo ? 'video' : 'image';
          ?>

            <div class="masonry-item card-hover shadow-sm trigger-popup" data-file="assets/img/uploads/<?= $gal['image']; ?>" data-type="<?= $tipeFile; ?>" oncontextmenu="return false;" draggable="false">

              <?php if ($isVideo): ?>
                <video src="assets/img/uploads/<?= $gal['image']; ?>" class="gallery-img" muted loop autoplay playsinline></video>
                <div class="overlay">
                  <i class="bi bi-play-circle search-icon"></i>
                </div>
              <?php else: ?>
                <img src="assets/img/uploads/<?= $gal['image']; ?>" class="gallery-img" alt="Gallery" draggable="false">
                <div class="overlay">
                  <i class="bi bi-zoom-in search-icon"></i>
                </div>
                <img src="assets/img/logo/logo-light.png" class="watermark-logo" alt="watermark">
              <?php endif; ?>

            </div>

          <?php endforeach; ?>
        </div>

      <?php endif; ?>
    </div>
  </div>

  <div class="modal fade" id="mediaModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content bg-transparent border-0">
        <div class="modal-body position-relative d-inline-block mx-auto">
          <div class="btn-close-custom max-sm:top-1 max-sm:right-1 max-sm:w-8 max-sm:h-8" data-bs-dismiss="modal">
            <i class="bi bi-x-lg fw-bold"></i>
          </div>

          <img src="" id="popupImage" class="img-fluid rounded shadow-lg d-none" alt="Popup Image">
          <video src="" id="popupVideo" class="img-fluid rounded shadow-lg d-none w-100" controls></video>
        </div>
      </div>
    </div>
  </div>

  <?php include 'includes/footer.php'; ?>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      const items = document.querySelectorAll('.trigger-popup');
      const mediaModal = new bootstrap.Modal(document.getElementById('mediaModal'));
      const popupImg = document.getElementById('popupImage');
      const popupVid = document.getElementById('popupVideo');

      items.forEach(item => {
        item.addEventListener('click', function() {
          const fileSrc = this.getAttribute('data-file');
          const fileType = this.getAttribute('data-type');

          if (fileType === 'video') {
            popupImg.classList.add('d-none');
            popupVid.classList.remove('d-none');
            popupVid.setAttribute('src', fileSrc);
            popupVid.play();
          } else {
            popupVid.classList.add('d-none');
            popupVid.pause();
            popupImg.classList.remove('d-none');
            popupImg.setAttribute('src', fileSrc);
          }

          mediaModal.show();
        });
      });

      document.getElementById('mediaModal').addEventListener('hidden.bs.modal', function() {
        popupVid.pause();
        popupVid.setAttribute('src', '');
      });
    });
  </script>
</body>

</html>