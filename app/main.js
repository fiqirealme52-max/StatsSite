// main.js — bootstrap DataNusa: router hash sederhana. Setiap hash (#/,
// #/penduduk, dst.) memetakan ke satu halaman di views.js; berpindah hash
// merender ulang halaman dan menaikkan scroll ke atas. Tidak ada jaringan,
// tidak ada state di luar halaman yang sedang dibuka.

import { render, redrawCharts } from "./views.js";

var root = document.getElementById("view");

function routeFromHash() {
  var hash = window.location.hash || "#/";
  var path = hash.replace(/^#\/?/, "").split("?")[0];
  return path === "" ? "home" : path;
}

function go() {
  render(routeFromHash(), root);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", go);

var resizeTimer = null;
window.addEventListener("resize", function () {
  if (resizeTimer) { window.clearTimeout(resizeTimer); }
  resizeTimer = window.setTimeout(function () { redrawCharts(root); }, 150);
});

go();
