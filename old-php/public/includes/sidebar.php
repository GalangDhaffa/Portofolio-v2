<?php
// Mendapatkan nama file yang sedang dibuka (misal: dashboard.php)
$current_page = basename($_SERVER['PHP_SELF']);
?>

<div class="sidebar shadow">
    <div class="text-center mb-4 px-3">
        <h5 class="text-white fw-bold mb-0">Dashboard <span class="text-primary">Admin</span></h5>
        <span class="badge bg-dark text-muted mt-1" style="font-size: 10px;">ADMINISTRATOR</span>
    </div>

    <div class="nav-header">Utama</div>
    <a href="dashboard.php" class="<?= $current_page == 'dashboard.php' ? 'active' : '' ?>">
        <i class="bi bi-grid-1x2-fill me-3"></i> Dashboard
    </a>
    <a href="manage_messages.php" class="<?= $current_page == 'manage_messages.php' ? 'active' : '' ?>">
        <i class="bi bi-envelope-paper-fill me-3"></i> Pesan Masuk
    </a>

    <div class="nav-header">Konten Portfolio</div>
    <a href="manage_projects.php" class="<?= $current_page == 'manage_projects.php' ? 'active' : '' ?>">
        <i class="bi bi-briefcase-fill me-3"></i> Kelola Proyek
    </a>
    <a href="manage_skills.php" class="<?= $current_page == 'manage_skills.php' ? 'active' : '' ?>">
        <i class="bi bi-cpu-fill me-3"></i> Kelola Skill
    </a>
    <a href="manage_gallery.php" class="<?= $current_page == 'manage_gallery.php' ? 'active' : '' ?>">
        <i class="bi bi-images me-3"></i> Galeri Foto
    </a>

    <div class="nav-header">Sistem</div>
    <a href="edit_profile.php" class="<?= $current_page == 'edit_profile.php' ? 'active' : '' ?>">
        <i class="bi bi-person-bounding-box me-3"></i> Edit Profil
    </a>
    <a href="logout.php" class="text-danger mt-2">
        <i class="bi bi-power me-3"></i> Logout
    </a>
</div>