<?php
require "includes/functions.php";

// Menangani Form Contact
if (isset($_POST["submit_contact"])) {
  $nama = htmlspecialchars($_POST["nama"]);
  $email = htmlspecialchars($_POST["email"]);
  $pesan = htmlspecialchars($_POST["pesan"]);

  $query = "INSERT INTO messages (name, email, message) VALUES ('$nama', '$email', '$pesan')";
  mysqli_query($conn, $query);

  if (mysqli_affected_rows($conn) > 0) {
    echo "<script>alert('Pesan berhasil dikirim!'); document.location.href = 'index.php#contact';</script>";
  } else {
    echo "<script>alert('Pesan gagal dikirim!');</script>";
  }
}

$profileQuery = query("SELECT * FROM profile WHERE id = 1");
$profile = $profileQuery ? $profileQuery[0] : [
  'home_image' => 'default.jpg',
  'about_text' => 'Teks about me belum diatur di database.'
];

$skills = query("SELECT * FROM skills ORDER BY id DESC");
$projects = query("SELECT * FROM projects ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="en" data-bs-theme="light">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio | Dhaffa Galang Fahriza</title>
  <link rel="shortcut icon" href="assets/img/logo/logo.png" type="image/x-icon">

  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/output.css">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <style>
    body.lock-scroll {
      overflow: hidden !important;
    }

    /* Efek melayang card */
    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card-hover:hover {
      transform: translateY(-8px);
      box-shadow: 0 1rem 3rem rgba(0, 0, 0, .15) !important;
    }

    [data-bs-theme="light"] .card {
      background-color: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.05) !important;
    }

    [data-bs-theme="light"] .form-control {
      background-color: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 576px) {
      .hero-title {
        font-size: 2.2rem !important;
      }

      .hero-subtitle {
        font-size: 1.5rem !important;
      }

      .custom-card-p {
        padding: 1.5rem !important;
      }
    }

    /* --- SOLUSI: KASIH "JARAK REM" BUAT SCROLL BIAR GA KETUTUP HEADER --- */
    #home,
    #aboutme,
    #service,
    #project,
    #contact {
      scroll-margin-top: 110px;
    }
  </style>
</head>

<body class="scroll-smooth lock-scroll" style="font-family: 'Josefin Sans', sans-serif;">
  <?php include 'includes/header.php'; ?>

  <!-- BAGIAN HOME -->
  <div id="home" class="container d-flex align-items-center justify-content-center px-4" style="min-height: calc(100dvh - 90px);">
    <div class="row flex-lg-row-reverse align-items-center w-100 g-4">

      <!-- Kolom Gambar -->
      <div class="col-10 col-sm-8 col-lg-6 mx-auto text-center">
        <img src="assets/img/uploads/<?= $profile['home_image']; ?>" class="d-block mx-auto shadow-lg img-fluid" alt="image" loading="lazy" style="border-radius: 3%;">
      </div>

      <!-- Kolom Teks -->
      <div class="col-lg-6 text-center text-lg-start mt-4 mt-lg-0">
        <h1 class="fw-bold text-body-emphasis lh-1 mb-3 text-4xl md:text-5xl hero-title">Selamat Datang di Portofolio Saya </h1>
        <h2 class="fw-bold text-body-emphasis lh-1 mb-4 text-2xl md:text-3xl hero-subtitle">Nama Saya Dhaffa Galang Fahriza </h2>

        <!-- Tombol Next dibuat rata tengah di HP dan tidak membentang penuh -->
        <div class="d-flex justify-content-center justify-content-lg-start mt-4">
          <button type="button" id="btnNext" class="btn btn-primary btn-lg px-5 shadow-sm rounded-pill">Next <i class="bi bi-arrow-down ms-1"></i></button>
        </div>
      </div>

    </div>
  </div>


  <div id="aboutme" class="container col-xxl-8 px-4 py-5 mt-md-5">
    <section class="text-center container mb-4">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h1 class="fw-bold text-3xl md:text-4xl">About Me</h1>
          <p class="lead mt-3">
            <?= nl2br($profile['about_text']); ?>
          </p>
        </div>
      </div>
    </section>

    <div class="container px-0 py-4" id="custom-cards">
      <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4">
        <div class="col">
          <a href="https://www.youtube.com/@Langz7z" class="text-decoration-none" target="_blank">
            <div class="card card-hover card-cover h-100 overflow-hidden rounded-4 shadow" style="background-image: url('assets/img/gallery/thumbnail.png'); background-size: cover; background-repeat: no-repeat;">
              <div class="d-flex flex-column h-100 p-6 md:p-12 custom-card-p pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 pb-5 display-6 lh-1 fw-bold">Streaming</h3>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto"><img src="assets/img/logo/logo.png" alt="logo" width="32" height="32" class="rounded-circle shadow-sm"></li>
                  <li class="d-flex align-items-center me-3"><i class="bi bi-globe-americas me-2"></i><small>Earth</small></li>
                </ul>
              </div>
            </div>
          </a>
        </div>

        <div class="col">
          <a href="https://www.tiktok.com/@langz7z" class="text-decoration-none" target="_blank">
            <div class="card card-hover card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow" style="background-image: url('assets/img/gallery/gaming.jpg'); background-size: cover; background-repeat: no-repeat;">
              <div class="d-flex flex-column h-100 p-6 md:p-12 custom-card-p pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Gaming</h3>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto"><img src="assets/img/logo/logo-light.png" alt="logo" width="32" height="32" class="rounded-circle shadow-sm"></li>
                  <li class="d-flex align-items-center me-3"><i class="bi bi-globe-americas me-2"></i><small>Earth</small></li>
                </ul>
              </div>
            </div>
          </a>
        </div>

        <div class="col">
          <a href="gallery.php" class="text-decoration-none">
            <div class="card card-hover card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow" style="background-image: url('assets/img/gallery/wm/wmvp\ \(3\).jpg'); background-size: cover; background-repeat: no-repeat;">
              <div class="d-flex flex-column h-100 p-6 md:p-12 custom-card-p pb-3 text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Photography</h3>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto"><img src="assets/img/logo/logo-dark.png" alt="logo" width="32" height="32" class="rounded-circle shadow-sm"></li>
                  <li class="d-flex align-items-center me-3"><i class="bi bi-globe-americas me-2"></i><small>Earth</small></li>
                </ul>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div id="service" class="container px-4 py-5 mt-md-5">
    <h1 class="pb-2 text-center fw-bold text-3xl md:text-4xl">Skill</h1>
    <div class="row g-4 py-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
      <?php foreach ($skills as $skill) : ?>
        <div class="col">
          <div class="card card-hover border-0 shadow-sm p-4 h-100 rounded-4 text-center">
            <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3 mx-auto">
              <img src="assets/img/uploads/<?= $skill['image']; ?>" alt="logo" width="80" height="auto" class="img-fluid" style="filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.1)); max-height: 80px; object-fit: contain;">
            </div>
            <h4 class="fw-bold text-body-emphasis"><?= $skill['name']; ?></h4>
            <?php if (!empty($skill['description'])): ?>
              <p class="text-muted mt-2 mb-0 text-sm md:text-base"><?= $skill['description']; ?></p>
            <?php endif; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <div id="project" class="container col-xxl-8 px-4 py-5 mt-md-5">
    <h1 class="text-center pb-4 fw-bold text-3xl md:text-4xl">Project</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <?php if (empty($projects)): ?>
        <p class="text-center w-100">Belum ada project yang ditambahkan.</p>
      <?php endif; ?>
      <?php foreach ($projects as $prj) : ?>
        <div class="col">
          <div class="card card-hover shadow h-100 border-0 rounded-4 overflow-hidden">
            <img src="assets/img/uploads/<?= $prj['image']; ?>" alt="project image" class="img-fluid w-100" style="height: 220px; object-fit: cover;">
            <div class="card-body d-flex flex-column p-4">
              <h4 class="fw-bold"><?= $prj['title']; ?></h4>
              <p class="card-text text-muted mb-4 text-sm md:text-base"><?= $prj['description']; ?></p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <a href="<?= $prj['link']; ?>" target="_blank" class="btn btn-outline-primary px-4 rounded-pill fw-medium w-full">Lihat Live</a>
              </div>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <div id="contact" class="container px-4 py-5 mt-md-5 mb-5 max-w-3xl mx-auto" style="max-width: 800px;">
    <div class="card border-0 shadow-sm rounded-4 p-6 md:p-12">
      <h1 class="text-center mb-4 fw-bold text-3xl md:text-4xl">Contact</h1>
      <form id="contactForm" class="row g-3">
        <div class="col-md-6 form-floating mb-2">
          <input type="text" name="nama" class="form-control rounded-3" id="floatingName" placeholder="Nama" required>
          <label for="floatingName" class="ms-2">Name</label>
        </div>
        <div class="col-md-6 form-floating mb-2">
          <input type="email" name="email" class="form-control rounded-3" id="floatingEmail" placeholder="Email" required>
          <label for="floatingEmail" class="ms-2">Email</label>
        </div>
        <div class="col-12 form-floating mb-4">
          <textarea name="pesan" class="form-control rounded-3" placeholder="Pesan" id="floatingTextarea2" style="height: 120px; resize: none;" required></textarea>
          <label for="floatingTextarea2" class="ms-2">Comments</label>
        </div>
        <div class="col-12 text-center">
          <button type="submit" class="btn btn-primary btn-lg px-5 rounded-pill shadow-sm w-full md:w-auto">Send Message</button>
        </div>
      </form>
      <div id="msgResponse" class="mt-3 text-center fw-bold"></div>
    </div>
  </div>

  <?php include 'includes/footer.php'; ?>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      const btnNext = document.getElementById("btnNext");
      const bodyEl = document.body;
      const aboutSection = document.getElementById("aboutme");

      if (btnNext) {
        btnNext.addEventListener("click", function() {
          bodyEl.classList.remove("lock-scroll");

          // JAVASCRIPT SCROLL FIX: Tambahin offset 110px biar bener-bener pas
          const yPosition = aboutSection.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({
            top: yPosition,
            behavior: "smooth"
          });
        });
      }
    });

    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);

      Swal.fire({
        title: 'Mengirim...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      fetch('actions/send_message.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.text())
        .then(data => {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Pesan kamu sudah terkirim.',
            confirmButtonText: 'Oke',
            confirmButtonColor: '#3b82f6'
          });
          document.getElementById('contactForm').reset();
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan, coba lagi nanti ya.'
          });
        });
    });
  </script>
</body>

</html>