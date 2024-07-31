<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio | Dhaffa Galang Fahriza</title>
  <link rel="shortcut icon" href="./img/logo/logo.png" type="image/x-icon">
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/output.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
</head>

<body class="bg-zinc-200" style=" font-family: 'Josefin Sans', sans-serif;">
  <?php include './include/header.php'; ?>

  <!-- HOME -->
  <div id="home" class="container col-xxl-8 px-4 pb-3 pt-64">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="./img/gallery/gallery1.jpg" class="d-block mx-lg-auto " alt="image" loading="lazy" style="border-radius: 3%;">
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Selamat Datang di Portofolio Saya </h1>
        <h2 class="fw-bold text-body-emphasis lh-1 mb-3">Saya Dhaffa Galang Fahriza </h2>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <a href="#aboutme"><button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Next</button></a>
        </div>
      </div>
    </div>
  </div>


  <!-- ABOUT ME -->
  <div id="aboutme" class="container col-xxl-8 px-4 pb-6 pt-20">
    <section class="pt-5 text-center container">
      <div class="row py-lg-5">
        <div class="mx-auto">
          <h1>About Me</h1>
          <p class="lead">
            Saya mahasiswa baru dari salah satu universitas yang ada di bandung yaitu Universitas Pasundan, Saya mengambil jurusan Teknik Informatika, karena saya ingin bisa membuat web sendiri dan ingin mengusai full stack, saya lulusan dari salah satu smk swasta yang berada di bekasi yaitu SMKS Taman Harapan Baru. Saya lahir di Bekasi 28 Januari 2005, saya juga memiliki beberapa hobi seperti bermain game, streaming dan fotografi.
          </p>
        </div>
      </div>
    </section>

    <div class="container px-4 py-4" id="custom-cards">

      <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4">
        <div class="col">
          <a href="https://www.youtube.com/@Galangdhaffa" class="text-decoration-none">
            <div class="card card-cover h-100 overflow-hidden rounded-4 shadow-lg" style="background-image: url('./img/gallery/thumbnail.png'); background-size: cover;  background-repeat: no-repeat;">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 pb-5 display-6 lh-1 fw-bold">Streaming</h3>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img src="./img/logo/logo.png" alt="Bootstrap" width="32" height="32" class="rounded-circle">
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#geo-fill"></use>
                    </svg>
                    <small>Earth</small>
                  </li>
                  <li class="d-flex align-items-center">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#calendar3"></use>
                    </svg>
                    <small>3d</small>
                  </li>
                </ul>
              </div>
            </div>
          </a>
        </div>

        <div class="col">
          <a href="https://www.tiktok.com/@langz7z" class="text-decoration-none">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('./img/gallery/gaming.jpg'); background-size: cover;  background-repeat: no-repeat;">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Gaming</h3>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img src="./img/logo/logo-light.png" alt="Bootstrap" width="32" height="32" class="rounded-circle">
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#geo-fill"></use>
                    </svg>
                    <small>Earth</small>
                  </li>
                  <li class="d-flex align-items-center">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#calendar3"></use>
                    </svg>
                    <small>4d</small>
                  </li>
                </ul>
              </div>
            </div>
          </a>
        </div>

        <div class="col">
          <a href="https://www.instagram.com/galangdhaffa" class="text-decoration-none">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('./img/gallery/fotografi.jpg'); background-size: cover;  background-repeat: no-repeat;">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Photography</h3>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img src="./img/logo/logo-dark.png" alt="Bootstrap" width="32" height="32" class="rounded-circle">
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#geo-fill"></use>
                    </svg>
                    <small>Earth</small>
                  </li>
                  <li class="d-flex align-items-center">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#calendar3"></use>
                    </svg>
                    <small>5d</small>
                  </li>
                </ul>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- SKILL -->
  <div id="service" class="container px-4 pb-6 pt-40" id="featured-3">
    <h1 class="pb-2 text-center">Skill</h1>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/php.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis ">PHP</h3>
        <p>Saya telah menguasai keterampilan dasar dalam PHP, yang mencakup pengetahuan tentang sintaks dasar, manipulasi data, dan pengelolaan basis data sederhana.</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/bootstrap.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">Bootstrap</h3>
        <p>Saya telah menguasai keterampilan dalam menggunakan Bootstrap. Dengan Bootstrap, saya mampu mempercepat pengembangan antarmuka web yang menarik dan konsisten di berbagai perangkat.</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/tailwind.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">tailwindcss</h3>
        <p>Saya telah menguasai keterampilan dasar dalam Tailwind CSS, termasuk penggunaan utility-first classes untuk cepat membangun dan menyesuaikan desain web yang responsif.</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/css.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">CSS</h3>
        <p>Saya telah menguasai CSS, termasuk penggunaan selektor, properti, dan aturan untuk merancang dan menata halaman web yang estetis dan responsif. Saya juga familiar dengan penggunaan Flexbox dan Grid untuk layout yang kompleks.</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/html.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">HTML</h3>
        <p>Saya telah menguasai HTML, termasuk penggunaan elemen-elemen dasar seperti heading, paragraph, link, dan form. Saya mampu membuat struktur halaman web yang semantik dan mudah dibaca.</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/mysql.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">MySQL</h3>
        <p>Saya telah menguasai keterampilan dasar dalam MySQL, termasuk pembuatan dan pengelolaan basis data, tabel, serta penulisan query sederhana untuk CRUD (Create, Read, Update, Delete).</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/premiere-pro.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">Adobe Premiere</h3>
        <p>Saya telah menguasai keterampilan dasar dalam Adobe Premiere Pro, termasuk pemotongan dan penggabungan klip, penambahan transisi, serta penyesuaian warna dan audio untuk menghasilkan video yang berkualitas tinggi.</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/after-effect.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">Adobe After Effects</h3>
        <p>Saya telah menguasai keterampilan dasar dalam Adobe After Effects, termasuk pembuatan animasi, efek visual, dan pengeditan video sederhana. Saya mampu membuat motion graphics yang menarik dan menyesuaikan elemen visual untuk proyek kreatif.</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/illustrator.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">Adobe Illustrator</h3>
        <p>Saya telah menguasai keterampilan dasar dalam Adobe Illustrator, termasuk penggunaan alat-alat dasar seperti pen tool, shape tool, dan pathfinder untuk membuat ilustrasi dan desain grafis yang berkualitas.</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/lightroom.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">Adobe Lightroom</h3>
        <p>Saya telah menguasai keterampilan dasar dalam Adobe Lightroom, termasuk pengaturan dan penyesuaian foto menggunakan alat-alat seperti exposure, contrast, dan color balance. Saya juga dapat mengelola dan mengatur koleksi foto dengan efisien.</p>
      </div>

      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
          <img src="./img/skill/photoshop.png" alt="logo" width="100" height="auto">
        </div>
        <h3 class="fs-2 text-body-emphasis">Adobe Photoshop</h3>
        <p>Saya telah menguasai keterampilan dasar dalam Adobe Photoshop, termasuk penggunaan alat-alat dasar seperti crop, resize, dan adjustment layers. Saya mampu mengedit gambar, membuat desain grafis sederhana, dan mengaplikasikan efek visual dasar.</p>
      </div>

    </div>
  </div>

  <!-- PROJECT -->

  <div id="project" class="container col-xxl-8 px-4 pb-6 pt-56">
    <h1 class="text-center py-5">Project</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div class="col">
        <div class="card shadow-sm">
          <img src="./img/project/project1.png" alt="image">
          <div class="card-body">
            <h4>portofolio v2</h4>
            <p class="card-text">Ini adalah website portofolio kedua saya yang di buat menggunakan php, js, tailwindcss, dan bootstrap, website ini di buat untuk memperbaiki portofolio v1.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="https://galangdhaffa.github.io/itw2023_project1_233040024/"><button type="button" class="btn btn-sm btn-outline-secondary">View</button></a>
              </div>
              <small class="text-body-secondary">9 mins</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card shadow-sm">
          <img src="./img/project/project2.png" alt="image">
          <div class="card-body">
            <h4>Secreto Custom Garage</h4>
            <p class="card-text">Website ini dibuat untuk menampil barang yang di jual di bengkel secreto, bengkel ini berada di dalam game GTA V Roleplay yang berada di server Prestige.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="https://secretogarage.my.id/" button type="button" class="btn btn-sm btn-outline-secondary">View</button></a>
              </div>
              <small class="text-body-secondary">9 mins</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card shadow-sm">
          <img src="./img/project/project3.png" alt="image">
          <div class="card-body">
            <h4>portofolio v1</h4>
            <p class="card-text">Ini website portofolio pertama saya yang saya buat menggunakan css dan html saja, website ini di buat karena project tugas besar agar bisa mendapatkan nilai A.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="https://galangdhaffa.github.io/itw2023_project1_233040024/"><button type="button" class="btn btn-sm btn-outline-secondary">View</button></a>
              </div>
              <small class="text-body-secondary">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- CONTACT -->
  <div id="contact" class="container px-4 pt-60 pb-52">
    <h1 class="text-center mb-5">Contact</h1>
    <form class="row g-3">
      <div class=" col form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="Ucup Birjon">
        <label for="floatingInput">Name</label>
      </div>
      <div class="col form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="maximal 300 alphabet" id="floatingTextarea2" style="height: 100px; resize: none;"></textarea>
        <label for="floatingTextarea2">Comments</label>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Send</button>
      </div>
    </form>
  </div>



  <?php include './include/footer.php'; ?>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</html>