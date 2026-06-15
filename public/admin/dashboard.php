<?php
require '../includes/functions.php';

if (!isset($_SESSION["login"])) {
    header("Location: login.php");
    exit;
}

$jumlahPesan = count(query("SELECT * FROM messages"));
$jumlahSkill = count(query("SELECT * FROM skills"));
$jumlahFoto  = count(query("SELECT * FROM gallery"));
$jumlahProject = count(query("SELECT * FROM projects"));
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | Dhaffa Galang</title>
    <link rel="shortcut icon" href="../assets/img/logo/logo-light.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/admin-style.css">

    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8f9fa;
        }

        .main-content {
            margin-left: 260px;
            padding: 2rem;
            transition: all 0.3s;
        }

        .stat-card {
            border: none;
            border-radius: 20px;
            transition: all 0.3s ease;
            height: 100%;
            position: relative;
            overflow: hidden;
        }

        .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
        }

        .icon-box {
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
        }

        .card-footer-link {
            background: rgba(0, 0, 0, 0.05);
            text-decoration: none;
            display: block;
            padding: 12px;
            color: inherit;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            transition: 0.3s;
        }

        .stat-card:hover .card-footer-link {
            background: rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 992px) {
            .main-content {
                margin-left: 0;
                padding: 1.5rem;
            }
        }
    </style>
</head>

<body>

    <?php include '../includes/sidebar.php'; ?>

    <div class="main-content">
        <div class="container-fluid">

            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                <div>
                    <h2 class="fw-bold text-dark">Dashboard Overview</h2>
                    <p class="text-muted mb-0">Selamat datang kembali, <strong><?= $_SESSION['username']; ?></strong>.</p>
                </div>
                <div class="bg-white px-4 py-2 rounded-pill shadow-sm border">
                    <i class="bi bi-calendar-check text-primary me-2"></i>
                    <span class="fw-medium"><?= date('l, d F Y'); ?></span>
                </div>
            </div>

            <div class="row g-4">
                <?php
                $cards = [
                    ['Pesan Masuk', $jumlahPesan, 'bi-envelope-fill', 'bg-primary text-white', 'manage_messages.php'],
                    ['Total Proyek', $jumlahProject, 'bi-briefcase-fill', 'bg-danger text-white', 'manage_projects.php'],
                    ['Total Skill', $jumlahSkill, 'bi-award-fill', 'bg-success text-white', 'manage_skills.php']
                ];
                foreach ($cards as $c): ?>
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card stat-card <?= $c[3]; ?> shadow-sm">
                            <div class="card-body p-4">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="opacity-75 text-uppercase small fw-bold"><?= $c[0]; ?></h6>
                                        <h1 class="fw-bold display-5"><?= $c[1]; ?></h1>
                                    </div>
                                    <div class="icon-box"><i class="bi <?= $c[2]; ?>"></i></div>
                                </div>
                            </div>
                            <a href="<?= $c[4]; ?>" class="card-footer-link">Lihat Detail <i class="bi bi-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                <?php endforeach; ?>

                <div class="col-12 col-lg-6">
                    <div class="card stat-card bg-warning text-dark shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="opacity-75 text-uppercase small fw-bold">Galeri Foto</h6>
                                    <h1 class="fw-bold display-5"><?= $jumlahFoto; ?></h1>
                                </div>
                                <div class="icon-box bg-black bg-opacity-10"><i class="bi bi-images"></i></div>
                            </div>
                        </div>
                        <a href="manage_gallery.php" class="card-footer-link">Buka Galeri <i class="bi bi-arrow-right ms-1"></i></a>
                    </div>
                </div>

                <div class="col-12 col-lg-6">
                    <div class="card stat-card bg-dark text-white shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="opacity-75 text-uppercase small fw-bold">Profil</h6>
                                    <h4 class="fw-bold mt-1">Update Deskripsi & Foto</h4>
                                </div>
                                <div class="icon-box text-info"><i class="bi bi-person-bounding-box"></i></div>
                            </div>
                        </div>
                        <a href="edit_profile.php" class="card-footer-link">Edit Profil <i class="bi bi-arrow-right ms-1"></i></a>
                    </div>
                </div>
            </div>

            <div class="mt-5 p-4 bg-white border-0 shadow-sm rounded-4 d-flex align-items-center">
                <i class="bi bi-info-circle-fill text-primary fs-3 me-3"></i>
                <p class="mb-0 text-muted">Ini adalah pusat kendali portfolio kamu. Gunakan sidebar di sebelah kiri untuk navigasi cepat.</p>
            </div>

        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>