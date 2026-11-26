// DataNusa — semua angka di sini diverifikasi langsung dari rilis BPS
// pada 26 November 2026. Tidak ada angka tanpa sumber: setiap indikator
// membawa nama sumber, tanggal rilis, dan tahun data. Satuan mengikuti
// penulisan BPS (koma sebagai pemisah desimal).

export const VERIFIED_ON = "26 November 2026";

export const INDICATORS = [
  {
    id: "penduduk",
    name: "Penduduk",
    value: "284,67",
    unit: "juta jiwa",
    year: "2025",
    headline: "Jumlah penduduk Indonesia hasil SUPAS 2025.",
    change: "Laju tumbuh 1,08% per tahun",
    changeNote: "Melambat dari 1,10% pada 2020.",
    blurb: "Sebanyak 55,65% penduduk tinggal di Pulau Jawa. Rasio ketergantungan 45,05 dan penduduk lansia 11,97%.",
    meaning: "Indonesia masih menikmati bonus demografi, tetapi proporsi lansia yang sudah di atas 10% menandai awal penuaan penduduk. Perencana perlu menyiapkan layanan kesehatan dan pensiun selagi angkatan kerja masih besar.",
    source: "BPS, Survei Penduduk Antar Sensus (SUPAS) 2025",
    release: "Berita Resmi Statistik, 5 Mei 2026"
  },
  {
    id: "ekonomi",
    name: "Ekonomi",
    value: "5,11",
    unit: "% tumbuh",
    year: "2025",
    headline: "PDB Indonesia tumbuh 5,11% sepanjang 2025.",
    change: "PDB Rp23.821,1 triliun",
    changeNote: "Naik dari 5,03% pada 2024.",
    blurb: "PDB per kapita Rp83,7 juta, setara US$5.083,4. Hampir semua lapangan usaha tumbuh positif.",
    meaning: "Pertumbuhan 2025 sedikit lebih cepat dari 2024. Bagi pembaca, angka ini menjelaskan mengapa lapangan kerja dan upah bergerak — dan mengapa harga tetap perlu dijaga agar daya beli tidak tergerus.",
    source: "BPS, Berita Resmi Statistik PDB",
    release: "Berita Resmi Statistik, 5 Februari 2026"
  },
  {
    id: "harga",
    name: "Harga",
    value: "2,92",
    unit: "% inflasi",
    year: "2025",
    headline: "Inflasi setahun penuh 2025 sebesar 2,92% (yoy).",
    change: "Dalam sasaran 2,5% ± 1%",
    changeNote: "Naik dari 1,57% pada 2024.",
    blurb: "Inflasi inti 2,38%, volatile food 6,21%, administered prices 1,93%. Emas perhiasan penyumbang terbesar di Desember.",
    meaning: "Harga-harga naik lebih cepat dari 2024, terutama pangan bergejolak. Tetapi inflasi masih di dalam sasaran, jadi daya beli tidak jatuh secepat saat inflasi 2022.",
    source: "BPS via Bank Indonesia, siaran pers inflasi IHK",
    release: "5 Januari 2026"
  },
  {
    id: "kerja",
    name: "Kerja",
    value: "4,85",
    unit: "% TPT",
    year: "Agu 2025",
    headline: "Tingkat pengangguran terbuka 4,85% pada Agustus 2025.",
    change: "7,46 juta orang menganggur",
    changeNote: "Turun dari 4,91% pada Agustus 2024.",
    blurb: "Pekerja penuh waktu 67,32%, paruh waktu 24,77%, setengah penganggur 7,91% (11,6 juta orang). Upah rata-rata Rp3,33 juta per bulan.",
    meaning: "Pengangguran turun tipis, tetapi hampir sepertiga pekerja belum bekerja penuh. Angka TPT saja tidak cukup: yang menentukan kesejahteraan adalah jam kerja dan upah, bukan sekadar status bekerja.",
    source: "BPS, Keadaan Ketenagakerjaan Indonesia Agustus 2025 (Sakernas)",
    release: "Berita Resmi Statistik, 5 November 2025"
  },
  {
    id: "kemiskinan",
    name: "Kemiskinan",
    value: "8,47",
    unit: "% penduduk",
    year: "Mar 2025",
    headline: "Penduduk miskin 8,47% pada Maret 2025.",
    change: "23,85 juta jiwa",
    changeNote: "Turun dari 8,57% pada September 2024.",
    blurb: "Garis kemiskinan Rp609.160 per kapita per bulan. Kemiskinan kota 6,73%, desa 11,03%.",
    meaning: "Ini angka kemiskinan terendah dalam dua dekade menurut garis BPS. Namun garisnya — sekitar Rp20 ribu per hari — sangat rendah; jutaan orang di atas garis itu tetap hidup pas-pasan.",
    source: "BPS, Profil Kemiskinan di Indonesia",
    release: "Berita Resmi Statistik, Maret 2025"
  },
  {
    id: "ipm",
    name: "Pembangunan Manusia",
    value: "75,90",
    unit: "skor IPM",
    year: "2025",
    headline: "IPM Indonesia 2025 mencapai 75,90, kategori tinggi.",
    change: "Naik 0,88 poin dari 2024",
    changeNote: "IPM 2024 sebesar 75,02.",
    blurb: "DKI Jakarta provinsi tertinggi dengan IPM 85,05. IPM mengukur umur panjang, pendidikan, dan standar hidup layak.",
    meaning: "IPM naik setiap tahun sejak 2022. Kenaikan yang stabil — bukan lompatan — menandakan perbaikan pendidikan dan kesehatan yang merata, meski kesenjangan antarprovinsi masih lebar.",
    source: "BPS, Berita Resmi Statistik Indeks Pembangunan Manusia",
    release: "Berita Resmi Statistik, 5 November 2026"
  }
];

// Seri waktu untuk chart. Nilai numerik memakai titik desimal (untuk
// digambar); label tampil memakai koma sesuai penulisan Indonesia.
export const SERIES = {
  penduduk: {
    title: "Jumlah penduduk Indonesia",
    unit: "juta jiwa",
    labels: ["2010", "2015", "2020", "2025"],
    values: [237.64, 255.18, 270.2, 284.67],
    note: "Sensus Penduduk 2010 dan 2020, SUPAS 2015 dan 2025. Sumber: BPS."
  },
  ekonomi: {
    title: "Pertumbuhan PDB",
    unit: "% per tahun",
    labels: ["2021", "2022", "2023", "2024", "2025"],
    values: [3.7, 5.31, 5.05, 5.03, 5.11],
    note: "Pertumbuhan PDB atas dasar harga konstan. Sumber: BPS, Pendapatan Nasional Indonesia 2021–2025."
  },
  harga: {
    title: "Inflasi tahunan (yoy) 2025",
    unit: "% yoy",
    labels: ["Agu", "Sep", "Nov", "Des"],
    values: [2.31, 2.65, 2.72, 2.92],
    note: "Inflasi IHK year-on-year per bulan, 2025. Sumber: BPS."
  },
  kerja: {
    title: "Tingkat pengangguran terbuka",
    unit: "% angkatan kerja",
    labels: ["Feb 2024", "Agu 2024", "Feb 2025", "Agu 2025"],
    values: [4.82, 4.91, 4.76, 4.85],
    note: "TPT dari Sakernas. Sumber: BPS, Keadaan Ketenagakerjaan Indonesia."
  },
  kemiskinan: {
    title: "Persentase penduduk miskin",
    unit: "% penduduk",
    labels: ["Sep 2024", "Mar 2025", "Sep 2025"],
    values: [8.57, 8.47, 8.25],
    note: "Garis kemiskinan nasional BPS. Sumber: BPS, Profil Kemiskinan."
  },
  ipm: {
    title: "Indeks Pembangunan Manusia",
    unit: "skor",
    labels: ["2022", "2023", "2024", "2025"],
    values: [73.77, 74.39, 75.02, 75.9],
    note: "IPM nasional, kategori tinggi sejak 2022. Sumber: BPS."
  },
  provinsi: {
    title: "Provinsi berpenduduk terbanyak, 2025",
    unit: "juta jiwa",
    labels: ["Jawa Barat", "Jawa Timur", "Jawa Tengah"],
    values: [50.759, 42.089, 38.234],
    note: "Proyeksi penduduk pertengahan 2025. Sumber: BPS, Proyeksi Penduduk Indonesia 2020–2050."
  }
};

// Provinsi: hanya baris yang angkanya terverifikasi. Tabel penduduk dan
// tabel pengangguran dipisah supaya tidak ada sel kosong.
export const PROVINCE_POP = [
  { name: "Jawa Barat", pop: 50.759, popText: "50,759 juta", share: "17,84% dari total nasional" },
  { name: "Jawa Timur", pop: 42.089, popText: "42,089 juta", share: "14,80% dari total nasional" },
  { name: "Jawa Tengah", pop: 38.234, popText: "38,234 juta", share: "13,44% dari total nasional" },
  { name: "Papua Barat", pop: 0.588, popText: "587.645 jiwa", share: "Provinsi tersedikit kedua" },
  { name: "Papua Selatan", pop: 0.55, popText: "549.651 jiwa", share: "Provinsi tersedikit" }
];

export const PROVINCE_TPT = [
  { name: "Papua", tpt: 6.96, tptText: "6,96%", note: "TPT tertinggi, Agustus 2025" },
  { name: "Nasional", tpt: 4.85, tptText: "4,85%", note: "Pembanding nasional, Agustus 2025" },
  { name: "Bali", tpt: 1.49, tptText: "1,49%", note: "TPT terendah, Agustus 2025" }
];

export const RELEASES = [
  { date: "5 Nov 2026", text: "IPM Indonesia 2025 mencapai 75,90, naik 0,88 poin dari 2024.", link: "#/ipm" },
  { date: "5 Mei 2026", text: "SUPAS 2025: penduduk Indonesia 284,67 juta jiwa; 55,65% di Pulau Jawa.", link: "#/penduduk" },
  { date: "5 Feb 2026", text: "Ekonomi 2025 tumbuh 5,11%; PDB Rp23.821,1 triliun.", link: "#/ekonomi" },
  { date: "5 Jan 2026", text: "Inflasi 2025 sebesar 2,92% (yoy), tetap dalam sasaran 2,5% ± 1%.", link: "#/harga" },
  { date: "5 Nov 2025", text: "TPT Agustus 2025 sebesar 4,85%; penganggur 7,46 juta orang.", link: "#/kerja" }
];

export function indicatorById(id) {
  return INDICATORS.find(function (item) { return item.id === id; });
}

export function formatNumber(value) {
  return String(value).replace(".", ",");
}
