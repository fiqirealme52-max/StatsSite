[![DataNusa](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/fiqirealme52-max/StatsSite/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/fiqirealme52-max/StatsSite/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# DataNusa — Statistik Indonesia

Situs statistik Indonesia berbahasa Indonesia, dibangun dari angka resmi
Badan Pusat Statistik (BPS). Setiap angka disertai sumber, tanggal rilis,
dan tahun data — tidak ada angka tanpa sumber.

## Isi

- **Beranda** — enam indikator utama (penduduk, ekonomi, harga, kerja,
  kemiskinan, IPM) dengan pencarian dan chart pertumbuhan PDB.
- **Penduduk** — 284,67 juta jiwa (SUPAS 2025), sebaran pulau, rasio
  ketergantungan, dan lansia.
- **Ekonomi** — PDB tumbuh 5,11% (2025), Rp23.821,1 triliun.
- **Harga** — inflasi 2,92% yoy (2025) beserta komponennya.
- **Kerja** — TPT 4,85% (Agustus 2025) dan komposisi pekerja.
- **Kemiskinan** — 8,47% (Maret 2025) dan garis kemiskinan.
- **IPM** — 75,90 (2025), kategori tinggi.
- **Provinsi** — penduduk terbanyak/terkecil dan pengangguran tertinggi/
  terendah, dengan tabel yang bisa diurutkan.
- **Sumber & Metode** — daftar lengkap sumber dan tanggal verifikasi.

## Menjalankan

Situs statis tanpa build step dan tanpa jaringan. Sajikan folder `app/`
dengan server HTTP statis apa pun, misalnya:

```sh
cd app && python3 -m http.server 8080
```

Lalu buka `http://localhost:8080/` di desktop atau HP. Semua halaman
adalah hash route (`#/ekonomi`, `#/provinsi`, …), semua chart digambar
sendiri di canvas tanpa library, dan semua kontrol (pencarian, tombol
Batang/Garis, sortir tabel) berfungsi.

## Struktur

- `app/index.html` — kerangka, navigasi, footer
- `app/style.css` — seluruh visual (font sistem saja)
- `app/data.js` — semua angka, sumber, dan tanggal rilis
- `app/charts.js` — chart batang/garis di canvas, tanpa library
- `app/views.js` — render halaman + pencarian + toggle + sortir
- `app/main.js` — router hash
- `main.ts` — menyerahkan `app/` dan `screenshots/` beserta `dossier.json`
- `vendor/makefun-frontend.ts` — library dossier dari kit make.fun, tidak diubah

Angka diverifikasi dari rilis BPS pada 26 November 2026. DataNusa bukan
situs resmi BPS dan tidak berafiliasi dengan BPS.
