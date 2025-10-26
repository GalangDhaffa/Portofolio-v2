<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gallery Photography | Dhaffa Galang Fahriza</title>
  <link rel="shortcut icon" href="./img/logo/logo.png" type="image/x-icon">
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/output.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100..700&display=swap" rel="stylesheet">

  <style>
    .gallery-container h1 {
      text-align: center;
      margin-top: 50px;
      font-family: 'Droid Sans', sans-serif;
      font-weight: bold;
    }

    .gallery-container p.page-description {
      text-align: center;
      margin: 25px auto;
      font-size: 18px;
      color: #999;
    }

    .tz-gallery {
      padding: 40px;
    }

    /* Override bootstrap column paddings */
    .tz-gallery .row div {
      padding: 2px;
    }

    .tz-gallery .lightbox {
      position: relative;
      display: block;
    }

    .tz-gallery .lightbox img {
      width: 100%;
      border-radius: 0;
    }

    .tz-gallery .lightbox:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      background-color: rgba(187, 187, 187, 0.7);
      content: '';
      transition: opacity 0.4s;
      z-index: 1;
    }

    .tz-gallery .lightbox:hover:after {
      opacity: 1;
    }

    .tz-gallery .lightbox:hover img {
      z-index: -1;
    }

    .tz-gallery .lightbox .search-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: whitesmoke;
      font-size: 2rem;
      opacity: 0;
      transition: opacity 0.4s;
      z-index: 2;
    }

    .tz-gallery .lightbox:hover .search-icon {
      opacity: 1;
    }

    .baguetteBox-button {
      background-color: transparent !important;
    }

    @media(max-width: 768px) {
      body {
        padding: 0;
      }
    }
  </style>
</head>

<body class="bg-zinc-200" style="font-family: 'Josefin Sans', sans-serif;">
  <?php include './include/header.php'; ?>

  <div class="container p-40 gallery-container">
    <h1>Gallery Photography</h1>
    <p class="page-description text-center">© By Dhaffa Galang Fahriza</p>
    <div class="tz-gallery">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <a class="lightbox" href="./img/gallery/wm/wmv (1).jpg">
            <img src="./img/gallery/wm/wmv (1).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="./img/gallery/wm/wmv (2).jpg">
            <img src="./img/gallery/wm/wmv (2).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="./img/gallery/wm/wmv (3).jpg">
            <img src="./img/gallery/wm/wmv (3).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="./img/gallery/wm/wmv (4).jpg">
            <img src="./img/gallery/wm/wmv (4).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (5).jpg">
            <img src="././img/gallery/wm/wmv (5).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="./img/gallery/wm/wmv (6).jpg">
            <img src="./img/gallery/wm/wmv (6).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="./img/gallery/wm/wmv (7).jpg">
            <img src="./img/gallery/wm/wmv (7).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="./img/gallery/wm/wmv (8).jpg">
            <img src="./img/gallery/wm/wmv (8).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="./img/gallery/wm/wmv (9).jpg">
            <img src="./img/gallery/wm/wmv (9).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (10).jpg">
            <img src="././img/gallery/wm/wmv (10).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (11).jpg">
            <img src="././img/gallery/wm/wmv (11).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (12).jpg">
            <img src="././img/gallery/wm/wmv (12).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (13).jpg">
            <img src="././img/gallery/wm/wmv (13).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (14).jpg">
            <img src="././img/gallery/wm/wmv (14).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (16).jpg">
            <img src="././img/gallery/wm/wmv (16).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (16).jpg">
            <img src="././img/gallery/wm/wmv (16).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (17).jpg">
            <img src="././img/gallery/wm/wmv (17).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (18).jpg">
            <img src="././img/gallery/wm/wmv (18).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (19).jpg">
            <img src="././img/gallery/wm/wmv (19).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (20).jpg">
            <img src="././img/gallery/wm/wmv (20).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmv (21).jpg">
            <img src="././img/gallery/wm/wmv (21).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <!-- horizontal -->
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmh (1).jpg">
            <img src="././img/gallery/wm/wmh (1).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmh (2).jpg">
            <img src="././img/gallery/wm/wmh (2).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmh (3).jpg">
            <img src="././img/gallery/wm/wmh (3).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <!-- vertikal panjang -->
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmvp (1).jpg">
            <img src="././img/gallery/wm/wmvp (1).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmvp (2).jpg">
            <img src="././img/gallery/wm/wmvp (2).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmvp (3).jpg">
            <img src="././img/gallery/wm/wmvp (3).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <!--  -->
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmvk (1).jpg">
            <img src="././img/gallery/wm/wmvk (1).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmvk (2).jpg">
            <img src="././img/gallery/wm/wmvk (2).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmvk (2).jpg">
            <img src="././img/gallery/wm/wmvk (2).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <!--  -->
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmvk (2).jpg">
            <img src="././img/gallery/wm/wmvk (2).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="././img/gallery/wm/wmvk (2).jpg">
            <img src="././img/gallery/wm/wmvk (2).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
        <div class="col-sm-6 col-md-4">
          <a class="lightbox" href="public/img/gallery/IMG-20250829-WA0023.jpg">
            <img src="././img/gallery/wm/wmvk (2).jpg" alt="image">
            <i class="bi bi-search search-icon"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <?php include './include/footer.php'; ?>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</body>

</html>