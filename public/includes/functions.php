<?php
session_start(); // Wajib untuk sistem login
$conn = mysqli_connect("localhost", "root", "", "portofolio_v2");

// Fungsi untuk mengambil data (Read)
function query($query)
{
    global $conn;
    $result = mysqli_query($conn, $query);
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    return $rows;
}

// Fungsi untuk upload gambar ke folder img/uploads
function upload() {
    $namaFile = $_FILES['gambar']['name'];
    $ukuranFile = $_FILES['gambar']['size'];
    $error = $_FILES['gambar']['error'];
    $tmpName = $_FILES['gambar']['tmp_name'];

    // 1. Cek apakah ada file yang dipilih
    if( $error === 4 ) {
        echo "<script>alert('Pilih gambar terlebih dahulu!');</script>";
        return false;
    }

    // 2. Cek ekstensi file
    $ekstensiGambarValid = ['jpg', 'jpeg', 'png'];
    $ekstensiGambar = explode('.', $namaFile);
    $ekstensiGambar = strtolower(end($ekstensiGambar));
    if( !in_array($ekstensiGambar, $ekstensiGambarValid) ) {
        echo "<script>alert('Yang Anda upload bukan gambar!');</script>";
        return false;
    }

    // 3. Buat nama file unik
    $namaFileBaru = uniqid() . '.' . $ekstensiGambar;

    // 4. LOKASI TARGET (Otomatis mendeteksi root folder)
    // dirname(__DIR__) akan menghasilkan lokasi folder 'public'
    $lokasiTarget = dirname(__DIR__) . '/assets/img/uploads/' . $namaFileBaru;

    // 5. Eksekusi pindah file
    if (move_uploaded_file($tmpName, $lokasiTarget)) {
        return $namaFileBaru; // Berhasil
    } else {
        // JIKA GAGAL, ALERT INI AKAN MUNCUL DAN MEMBERI TAHU ALASANNYA
        echo "<script>alert('GAGAL UPLOAD FOTO!\\n\\nSistem mencoba menyimpan di:\\n" . addslashes($lokasiTarget) . "\\n\\nPastikan folder tersebut benar-benar ADA di VS Code lu.');</script>";
        return false;
    }
}

// FUNGSI KHUSUS UNTUK UPLOAD BANYAK FILE (FOTO & VIDEO)
function upload_multiple() {
    $uploaded_files = [];
    $jumlah_file = count($_FILES['gambar']['name']);

    // Looping sebanyak file yang dipilih user
    for ($i = 0; $i < $jumlah_file; $i++) {
        $namaFile = $_FILES['gambar']['name'][$i];
        $error = $_FILES['gambar']['error'][$i];
        $tmpName = $_FILES['gambar']['tmp_name'][$i];

        if ($error === 4) continue; // Skip kalau kosong

        // Tambahkan mp4 dan webm untuk video
        $ekstensiValid = ['jpg', 'jpeg', 'png', 'mp4', 'webm'];
        $ekstensiFile = explode('.', $namaFile);
        $ekstensiFile = strtolower(end($ekstensiFile));

        if (!in_array($ekstensiFile, $ekstensiValid)) {
            echo "<script>alert('Gagal: Format file $namaFile tidak didukung!');</script>";
            continue;
        }

        $namaFileBaru = uniqid() . '.' . $ekstensiFile;
        $lokasiTarget = dirname(__DIR__) . '/assets/img/uploads/' . $namaFileBaru;

        if (move_uploaded_file($tmpName, $lokasiTarget)) {
            $uploaded_files[] = $namaFileBaru; // Masukkan nama file sukses ke array
        }
    }
    
    return $uploaded_files; // Kembalikan semua file yang sukses diupload
}
