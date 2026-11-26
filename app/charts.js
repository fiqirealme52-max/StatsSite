// charts.js — menggambar chart batang dan garis di <canvas> tanpa library.
// Satu-satunya dependensi: ukuran canvas dan seri dari data.js. Semua teks
// digambar dengan font sistem supaya tidak ada unduhan font dari jaringan.

var INK = "#14312f";
var MUTED = "#6b7a78";
var TEAL = "#0e6b6b";
var AMBER = "#d97706";
var GRID = "#e3ddd0";

function setupCanvas(canvas) {
  var ratio = window.devicePixelRatio || 1;
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (!width || !height) { return null; }
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  var ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx: ctx, width: width, height: height };
}

function niceMax(values) {
  var max = Math.max.apply(null, values);
  if (max <= 0) { return 1; }
  var step = Math.pow(10, Math.floor(Math.log10(max)));
  return Math.ceil(max / step) * step;
}

function formatValue(value) {
  var text = (Math.round(value * 100) / 100).toString();
  return text.replace(".", ",");
}

// Menggambar satu chart. kind: "bar" atau "line".
export function drawChart(canvas, series, kind) {
  var box = setupCanvas(canvas);
  if (!box) { return; }
  var ctx = box.ctx;
  var width = box.width;
  var height = box.height;
  var padLeft = 46;
  var padRight = 12;
  var padTop = 14;
  var padBottom = 30;
  var plotW = width - padLeft - padRight;
  var plotH = height - padTop - padBottom;
  var max = niceMax(series.values);
  var min = 0;
  if (kind === "line") {
    var low = Math.min.apply(null, series.values);
    min = low > 0 ? Math.floor(low * 0.9) : 0;
  }
  var range = max - min || 1;

  function yOf(value) {
    return padTop + plotH - ((value - min) / range) * plotH;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.font = "12px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  // Garis grid + label sumbu Y (4 tingkat).
  var steps = 4;
  var i;
  for (i = 0; i <= steps; i++) {
    var v = min + (range * i) / steps;
    var y = yOf(v);
    ctx.strokeStyle = GRID;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillStyle = MUTED;
    ctx.fillText(formatValue(v), padLeft - 8, y);
  }

  var n = series.labels.length;
  var slot = plotW / n;
  var points = [];

  for (i = 0; i < n; i++) {
    var cx = padLeft + slot * i + slot / 2;
    var y = yOf(series.values[i]);
    points.push({ x: cx, y: y });
    if (kind === "bar") {
      var bw = Math.min(56, slot * 0.55);
      var top = yOf(series.values[i]);
      ctx.fillStyle = i === n - 1 ? AMBER : TEAL;
      ctx.fillRect(cx - bw / 2, top, bw, padTop + plotH - top);
    }
    ctx.fillStyle = INK;
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(formatValue(series.values[i]), cx, yOf(series.values[i]) - 8);
    ctx.font = "12px system-ui, sans-serif";
    ctx.fillStyle = MUTED;
    ctx.fillText(series.labels[i], cx, padTop + plotH + 18);
  }

  if (kind === "line") {
    ctx.strokeStyle = TEAL;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.beginPath();
    points.forEach(function (p, idx) {
      if (idx === 0) { ctx.moveTo(p.x, p.y); } else { ctx.lineTo(p.x, p.y); }
    });
    ctx.stroke();
    points.forEach(function (p, idx) {
      ctx.fillStyle = idx === points.length - 1 ? AMBER : "#ffffff";
      ctx.strokeStyle = TEAL;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
  }

  // Sumbu dasar.
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padLeft, padTop + plotH);
  ctx.lineTo(width - padRight, padTop + plotH);
  ctx.stroke();
}
