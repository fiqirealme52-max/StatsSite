// views.js — merender setiap halaman dari data.js dan memasang semua kontrol:
// pencarian di beranda, tombol Batang/Garis di tiap chart, dan sortir tabel
// provinsi. Tidak ada halaman tanpa kode di belakangnya: setiap link di nav
// dan di kartu memetakan ke satu route di sini.

import { INDICATORS, SERIES, PROVINCE_POP, PROVINCE_TPT, RELEASES, indicatorById, VERIFIED_ON } from "./data.js";
import { drawChart } from "./charts.js";

var chartKinds = { harga: "line" };
var popSortDir = -1;
var currentRoute = "home";

function esc(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function sourceBox(item) {
  return "<aside class=\"sourcebox\"><h2>Sumber angka ini</h2>" +
    "<p><strong>" + esc(item.source) + "</strong><br>" + esc(item.release) +
    "<br>Diverifikasi dari sumber live: " + esc(VERIFIED_ON) + ".</p>" +
    "<p>Angka di halaman ini adalah snapshot statis dari rilis tersebut dan " +
    "diperbarui mengikuti rilis BPS berikutnya.</p></aside>";
}

function chartCard(seriesKey, title) {
  var kind = chartKinds[seriesKey] || "bar";
  var series = SERIES[seriesKey];
  return "<section class=\"chartcard\"><div class=\"charthead\"><h2>" + esc(title) + "</h2>" +
    "<div class=\"toggle\" role=\"group\" aria-label=\"Jenis chart\">" +
    "<button type=\"button\" data-chart=\"" + seriesKey + "\" data-kind=\"bar\"" +
    (kind === "bar" ? " aria-pressed=\"true\" class=\"on\"" : " aria-pressed=\"false\"") + ">Batang</button>" +
    "<button type=\"button\" data-chart=\"" + seriesKey + "\" data-kind=\"line\"" +
    (kind === "line" ? " aria-pressed=\"true\" class=\"on\"" : " aria-pressed=\"false\"") + ">Garis</button>" +
    "</div></div>" +
    "<canvas class=\"chart\" data-series=\"" + seriesKey + "\" role=\"img\" aria-label=\"" +
    esc(series.title) + ", " + esc(series.unit) + "\"></canvas>" +
    "<p class=\"chartnote\">" + esc(series.note) + " Satuan: " + esc(series.unit) + ".</p></section>";
}

function paintCharts(root) {
  var canvases = root.querySelectorAll("canvas.chart");
  canvases.forEach(function (canvas) {
    var key = canvas.getAttribute("data-series");
    drawChart(canvas, SERIES[key], chartKinds[key] || "bar");
  });
}

export function redrawCharts(root) {
  paintCharts(root);
}

function indicatorPage(item) {
  var seriesKey = item.id === "ipm" ? "ipm" : item.id;
  return "<p class=\"crumb\"><a href=\"#/\">Beranda</a> / " + esc(item.name) + "</p>" +
    "<h1>" + esc(item.name) + "</h1>" +
    "<p class=\"lede\">" + esc(item.headline) + "</p>" +
    "<div class=\"bignum\"><span class=\"bignum-value\">" + esc(item.value) + "</span>" +
    "<span class=\"bignum-unit\">" + esc(item.unit) + " · " + esc(item.year) + "</span></div>" +
    chartCard(seriesKey, SERIES[seriesKey].title) +
    "<section class=\"facts\"><h2>Yang perlu diketahui</h2>" +
    "<ul><li><strong>" + esc(item.change) + ".</strong> " + esc(item.changeNote) + "</li>" +
    "<li>" + esc(item.blurb) + "</li></ul>" +
    "<h2>Apa artinya</h2><p>" + esc(item.meaning) + "</p></section>" +
    sourceBox(item);
}

function homePage() {
  var cards = INDICATORS.map(function (item) {
    return "<article class=\"kpi\" data-search=\"" +
      esc((item.name + " " + item.headline + " " + item.blurb).toLowerCase()) + "\">" +
      "<h2><a href=\"#/" + item.id + "\">" + esc(item.name) + "</a></h2>" +
      "<p class=\"kpi-value\">" + esc(item.value) + " <span>" + esc(item.unit) + "</span></p>" +
      "<p class=\"kpi-year\">" + esc(item.year) + "</p>" +
      "<p>" + esc(item.headline) + "</p>" +
      "<p><a class=\"morelink\" href=\"#/" + item.id + "\">Lihat detail &amp; chart →</a></p></article>";
  }).join("");
  var releases = RELEASES.map(function (r) {
    return "<li><span class=\"rel-date\">" + esc(r.date) + "</span> " +
      "<a href=\"" + r.link + "\">" + esc(r.text) + "</a></li>";
  }).join("");
  return "<section class=\"hero\"><p class=\"eyebrow\">Badan Pusat Statistik · data terverifikasi</p>" +
    "<h1>Indonesia dalam angka</h1>" +
    "<p class=\"lede\">Enam indikator utama Indonesia — penduduk, ekonomi, harga, kerja, " +
    "kemiskinan, dan pembangunan manusia — lengkap dengan sumber, tahun, dan chart. " +
    "Klik sebuah angka untuk melihat cerita di baliknya.</p>" +
    "<label class=\"searchbox\">Cari indikator: " +
    "<input id=\"q\" type=\"search\" placeholder=\"misalnya inflasi, pengangguran, IPM\" autocomplete=\"off\"></label>" +
    "<p id=\"searchcount\" class=\"searchcount\">Menampilkan 6 dari 6 indikator.</p></section>" +
    "<section class=\"kpis\" aria-label=\"Indikator utama\">" + cards + "</section>" +
    chartCard("ekonomi", "Pertumbuhan PDB 2021–2025") +
    "<section class=\"releases\"><h2>Rilis BPS terbaru</h2><ul>" + releases + "</ul>" +
    "<p><a href=\"#/sumber\">Semua sumber &amp; metode →</a></p></section>" +
    "<section class=\"explore\"><h2>Jelajahi</h2>" +
    "<p><a href=\"#/provinsi\">Perbandingan provinsi</a> — provinsi berpenduduk " +
    "terbanyak dan tersedikit, serta pengangguran tertinggi dan terendah.</p>" +
    "<p><a href=\"#/sumber\">Sumber &amp; metode</a> — dari mana setiap angka berasal " +
    "dan kapan diverifikasi.</p></section>";
}

function provincesPage() {
  var rows = PROVINCE_POP.slice().sort(function (a, b) {
    return (a.pop - b.pop) * popSortDir;
  }).map(function (p) {
    return "<tr><td>" + esc(p.name) + "</td><td class=\"num\">" + esc(p.popText) +
      "</td><td>" + esc(p.share) + "</td></tr>";
  }).join("");
  var tptRows = PROVINCE_TPT.map(function (p) {
    return "<tr><td>" + esc(p.name) + "</td><td class=\"num\">" + esc(p.tptText) +
      "</td><td>" + esc(p.note) + "</td></tr>";
  }).join("");
  var arrow = popSortDir === -1 ? " ↓" : " ↑";
  return "<p class=\"crumb\"><a href=\"#/\">Beranda</a> / Provinsi</p>" +
    "<h1>Perbandingan provinsi</h1>" +
    "<p class=\"lede\">Tiga provinsi di Pulau Jawa menampung hampir setengah penduduk " +
    "Indonesia, sementara provinsi termuda di Papua jumlah penduduknya di bawah " +
    "600 ribu jiwa.</p>" +
    chartCard("provinsi", SERIES.provinsi.title) +
    "<section><h2>Penduduk menurut provinsi, 2025</h2>" +
    "<p>Klik judul kolom <strong>Penduduk</strong> untuk mengurutkan dari terbesar " +
    "ke terkecil atau sebaliknya.</p>" +
    "<div class=\"tablewrap\"><table><thead><tr><th>Provinsi</th>" +
    "<th><button type=\"button\" id=\"sortpop\" class=\"sortbtn\">Penduduk" + arrow +
    "</button></th><th>Keterangan</th></tr></thead><tbody>" + rows + "</tbody></table></div>" +
    "<p class=\"chartnote\">Sumber: BPS, Proyeksi Penduduk Indonesia 2020–2050 " +
    "(pertengahan 2025). Total proyeksi 284,44 juta jiwa — sedikit berbeda dari " +
    "hasil SUPAS 2025 (284,67 juta) karena metode yang berbeda.</p></section>" +
    "<section><h2>Pengangguran tertinggi dan terendah</h2>" +
    "<div class=\"tablewrap\"><table><thead><tr><th>Wilayah</th><th>TPT</th>" +
    "<th>Keterangan</th></tr></thead><tbody>" + tptRows + "</tbody></table></div>" +
    "<p class=\"chartnote\">Sumber: BPS, Keadaan Ketenagakerjaan Indonesia Agustus 2025 (Sakernas).</p></section>" +
    "<section class=\"facts\"><h2>IPM tertinggi</h2>" +
    "<p>DKI Jakarta mencatat IPM 85,05 pada 2025 — provinsi tertinggi di Indonesia " +
    "(nasional 75,90). Sumber: BPS, Berita Resmi Statistik Indeks Pembangunan Manusia.</p></section>";
}

function sourcesPage() {
  var rows = INDICATORS.map(function (item) {
    return "<tr><td><a href=\"#/" + item.id + "\">" + esc(item.name) + "</a></td>" +
      "<td>" + esc(item.value) + " " + esc(item.unit) + " (" + esc(item.year) + ")</td>" +
      "<td>" + esc(item.source) + "</td><td>" + esc(item.release) + "</td></tr>";
  }).join("");
  return "<p class=\"crumb\"><a href=\"#/\">Beranda</a> / Sumber</p>" +
    "<h1>Sumber &amp; metode</h1>" +
    "<p class=\"lede\">Setiap angka di DataNusa berasal dari satu sumber: Badan Pusat " +
    "Statistik (BPS). Tidak ada angka perkiraan, tidak ada angka tanpa sumber.</p>" +
    "<div class=\"tablewrap\"><table><thead><tr><th>Indikator</th><th>Angka</th>" +
    "<th>Sumber</th><th>Rilis</th></tr></thead><tbody>" + rows + "</tbody></table></div>" +
    "<section class=\"facts\"><h2>Cara kami bekerja</h2>" +
    "<ul><li>Semua angka dibaca langsung dari Berita Resmi Statistik dan publikasi " +
    "BPS, lalu diverifikasi ulang pada " + esc(VERIFIED_ON) + ".</li>" +
    "<li>Angka provinsi memakai Proyeksi Penduduk BPS 2020–2050 (pertengahan 2025); " +
    "totalnya 284,44 juta jiwa, sedikit berbeda dari SUPAS 2025 karena metode berbeda — " +
    "keduanya dicantumkan apa adanya.</li>" +
    "<li>Situs ini adalah snapshot statis: tidak mengambil data dari jaringan saat " +
    "dibuka, sehingga angka di sini tidak berubah sampai diperbarui mengikuti rilis BPS.</li>" +
    "<li>DataNusa bukan situs resmi BPS dan tidak berafiliasi dengan BPS. " +
    "Untuk data resmi terbaru, kunjungi situs BPS.</li></ul></section>";
}

function bindControls(root) {
  var q = root.querySelector("#q");
  if (q) {
    q.addEventListener("input", function () {
      var term = q.value.trim().toLowerCase();
      var cards = root.querySelectorAll(".kpi");
      var shown = 0;
      cards.forEach(function (card) {
        var hit = !term || card.getAttribute("data-search").indexOf(term) !== -1;
        card.style.display = hit ? "" : "none";
        if (hit) { shown++; }
      });
      var count = root.querySelector("#searchcount");
      if (count) {
        count.textContent = shown === 0
          ? "Tidak ada indikator yang cocok dengan \"" + q.value.trim() + "\". Hapus kata kunci untuk melihat semua."
          : "Menampilkan " + shown + " dari 6 indikator.";
      }
    });
  }
  root.querySelectorAll(".toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-chart");
      chartKinds[key] = btn.getAttribute("data-kind");
      render(currentRoute, root);
    });
  });
  var sortBtn = root.querySelector("#sortpop");
  if (sortBtn) {
    sortBtn.addEventListener("click", function () {
      popSortDir = popSortDir * -1;
      render(currentRoute, root);
    });
  }
}

export function render(route, root) {
  currentRoute = route;
  var html;
  if (route === "home") {
    html = homePage();
  } else if (route === "provinsi") {
    html = provincesPage();
  } else if (route === "sumber") {
    html = sourcesPage();
  } else {
    var item = indicatorById(route);
    html = item ? indicatorPage(item) : homePage();
    if (!item) { currentRoute = "home"; }
  }
  root.innerHTML = html;
  bindControls(root);
  requestAnimationFrame(function () { paintCharts(root); });
  document.querySelectorAll(".mainnav a").forEach(function (a) {
    var target = a.getAttribute("data-nav");
    if (target === currentRoute || (currentRoute === "home" && target === "home")) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
}
