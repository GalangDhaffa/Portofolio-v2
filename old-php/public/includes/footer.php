<div class="bg-dark text-white mt-5">
  <div class="container">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-4 border-top border-secondary">
      
      <!-- Bagian Kiri: Logo & Copyright (Diperlebar jadi col-md-8) -->
      <div class="col-12 col-md-8 d-flex align-items-center mb-3 mb-md-0">
        <a href="index.php" class="me-3 text-white text-decoration-none lh-1">
          <img class="bi" width="30" height="30" role="img" aria-label="Logo" src="assets/img/logo/logo-light.png" alt="logo">
        </a>
        <span class="text-white-50 text-wrap">© 2024 - <?= date('Y'); ?> Dhaffa Galang Fahriza. All Rights Reserved.</span>
      </div>

      <!-- Bagian Kanan: Social Media Icons (Menyesuaikan sisa ruang) -->
      <ul class="nav col-12 col-md-4 justify-content-md-end justify-content-start list-unstyled d-flex align-items-center mb-0">
        <li class="ms-0 ms-md-3 me-3 me-md-0"><a class="text-white-50 fs-5" href="https://github.com/GalangDhaffa" target="_blank"><i class="bi bi-github"></i></a></li>
        <li class="ms-0 ms-md-3 me-3 me-md-0"><a class="text-white-50 fs-5" href="https://www.instagram.com/langz7z_" target="_blank"><i class="bi bi-instagram"></i></a></li>
        <li class="ms-0 ms-md-3 me-3 me-md-0"><a class="text-white-50 fs-5" href="https://www.youtube.com/@Langz7z" target="_blank"><i class="bi bi-youtube"></i></a></li>
        <li class="ms-0 ms-md-3 me-3 me-md-0"><a class="text-white-50 fs-5" href="https://www.tiktok.com/@langz7z" target="_blank"><i class="bi bi-tiktok"></i></a></li>
        <li class="ms-0 ms-md-3 me-3 me-md-0">
          <a class="text-white-50 fs-5 d-inline-flex align-items-center" href="https://linktr.ee/Galangdhaffa" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.736 5.853l4.005-4.117h-2.325L12 5.09 8.584 1.736H6.259l4.005 4.117H4.5v2.548h5.112L4.5 13.064h2.325L12 7.854l5.175 5.21h2.325l-5.112-4.663h5.112V5.853h-5.764zM12 14.862v7.402h2.24V14.862H12z" />
            </svg>
          </a>
        </li>
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

    // Fungsi pembantu untuk mengubah UI tombol/ikon agar tidak ditulis berulang
    const updateThemeUI = (theme) => {
      if (!themeIcon || !themeToggleBtn) return; // Mencegah error jika elemen tidak ada di halaman

      if (theme === 'dark') {
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        themeToggleBtn.classList.replace('btn-outline-warning', 'btn-outline-light');
      } else {
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        themeToggleBtn.classList.replace('btn-outline-light', 'btn-outline-warning');
      }
    };

    // 2. Terapin ikon yang benar saat halaman pertama kali dimuat
    updateThemeUI(currentTheme);

    // 3. Logika pas tombol diklik
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        // Cek tema yang sedang aktif saat tombol diklik
        const isLight = htmlElement.getAttribute('data-bs-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';

        // Terapkan perubahan ke HTML dan simpan di memori browser
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update tampilan ikon dan warna tombol
        updateThemeUI(newTheme);
      });
    }
  });
</script>
</body>

</html>