<!DOCTYPE html>
<html lang="en" data-bs-theme="light">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio | Dhaffa Galang</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <style>
    /* 1. Mengubah warna dasar Light Mode biar ga terlalu putih */
    [data-bs-theme="light"] {
      --bs-body-bg: #f4f4f5;
      /* Warna background kalem */
      --bs-tertiary-bg: #e4e4e7;
      /* Warna card/elemen pendukung */
    }

    /* Jarak atas body disesuaikan agar konten halaman tidak terpotong navbar fixed */
    body {
      padding-top: 90px;
    }

    /* Efek transisi warna teks menu saat kursor diarahkan */
    .link-hover {
      transition: color 0.2s ease-in-out;
    }

    .link-hover:hover {
      color: #ffffff !important;
    }

    .text-small {
      font-size: 0.85rem;
    }

    /* Pastikan gambar preview profile tetep cakep di background baru */
    .shadow-lg {
      box-shadow: 0 1rem 3rem rgba(0, 0, 0, .1) !important;
    }
  </style>
</head>

<body>

  <header class="fixed-top w-100 shadow-sm" style="z-index: 1000; background-color: #27272a; border-bottom: 1px solid #3f3f46;">
    <nav class="navbar navbar-expand-lg navbar-dark p-2 px-md-5">
      <div class="container-fluid">

        <a href="index.php" class="navbar-brand d-flex align-items-center me-auto">
          <img width="45" height="45" src="assets/img/logo/logo-light.png" alt="logo">
        </a>

        <div class="d-flex align-items-center order-lg-last ms-2 gap-2">
          <button class="btn btn-outline-warning rounded-circle" id="theme-toggle" type="button" style="width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
            <i class="bi bi-sun-fill" id="theme-icon"></i>
          </button>

          <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div class="collapse navbar-collapse justify-content-lg-end" id="navbarNav">
          <ul class="navbar-nav align-items-center text-center mt-3 mt-lg-0 gap-3 text-small">
            <li class="nav-item">
              <a href="index.php#home" class="nav-link text-white-50 px-2 d-flex flex-column align-items-center link-hover">
                <svg class="bi mb-1" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                </svg>
                <span>Home</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="index.php#aboutme" class="nav-link text-white-50 px-2 d-flex flex-column align-items-center link-hover">
                <svg class="bi mb-1" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <span>About Me</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="index.php#service" class="nav-link text-white-50 px-2 d-flex flex-column align-items-center link-hover">
                <svg class="bi mb-1" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 4.5a4.5 4.5 0 0 1-1.703 3.526L13 5l2.959-1.11q.04.3.041.61" />
                  <path d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.5 4.5 0 0 0 11.5 9m-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376M3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                </svg>
                <span>Skill</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="index.php#project" class="nav-link text-white-50 px-2 d-flex flex-column align-items-center link-hover">
                <svg class="bi mb-1" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z" />
                </svg>
                <span>Project</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="gallery.php" class="nav-link text-white-50 px-2 d-flex flex-column align-items-center link-hover">
                <svg class="bi mb-1" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                </svg>
                <span>Gallery</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="index.php#contact" class="nav-link text-white-50 px-2 d-flex flex-column align-items-center link-hover">
                <svg class="bi mb-1" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                </svg>
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  </header>