<div class="bg-dark text-white mt-5">
  <div class="container">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-4 border-top border-secondary">
      <div class="col-md-4 d-flex align-items-center">
        <a href="index.php" class="mb-3 me-2 mb-md-0 text-white text-decoration-none lh-1">
          <img class="bi me-2" width="30" height="30" role="img" aria-label="Logo" src="assets/img/logo/logo-light.png" alt="logo">
        </a>
        <span class="mb-3 mb-md-0 text-white-50">© <?= date('Y'); ?> Dhaffa Galang Fahriza</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-white-50 fs-5" href="https://github.com/GalangDhaffa" target="_blank"><i class="bi bi-github"></i></a></li>
        <li class="ms-3"><a class="text-white-50 fs-5" href="https://www.instagram.com/langz7z_" target="_blank"><i class="bi bi-instagram"></i></a></li>
        <li class="ms-3"><a class="text-white-50 fs-5" href="https://www.youtube.com/@Langz7z" target="_blank"><i class="bi bi-youtube"></i></a></li>
        <li class="ms-3"><a class="text-white-50 fs-5" href="https://www.tiktok.com/@langz7z" target="_blank"><i class="bi bi-tiktok"></i></a></li>
      </ul>
    </footer>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // 1. Cek history local storage, default mutlak adalah 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', currentTheme);

    // 2. Terapin ikon yang benar saat halaman dimuat
    if (currentTheme === 'dark' && themeIcon) {
      themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
      if (themeToggleBtn) {
        themeToggleBtn.classList.replace('btn-outline-warning', 'btn-outline-light');
      }
    } else if (currentTheme === 'light' && themeIcon) {
      themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
      if (themeToggleBtn) {
        themeToggleBtn.classList.replace('btn-outline-light', 'btn-outline-warning');
      }
    }

    // 3. Logika pas tombol diklik
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-bs-theme');

        if (theme === 'light') {
          // Pindah ke Dark Mode (Matahari jadi Bulan Putih)
          htmlElement.setAttribute('data-bs-theme', 'dark');
          localStorage.setItem('theme', 'dark');
          themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
          themeToggleBtn.classList.replace('btn-outline-warning', 'btn-outline-light');
        } else {
          // Pindah ke Light Mode (Bulan jadi Matahari Kuning)
          htmlElement.setAttribute('data-bs-theme', 'light');
          localStorage.setItem('theme', 'light');
          themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
          themeToggleBtn.classList.replace('btn-outline-light', 'btn-outline-warning');
        }
      });
    }
  });
</script>
</body>

</html>