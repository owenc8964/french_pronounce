// Q33：b306347 新加的「課本原句」在課本快取裡找不找得到（只讀）
const fs = require('fs'), path = require('path');
const T = fs.readFileSync(path.join(__dirname, '..', 'assets', '.textbook_cache.txt'), 'utf8');
const flat = T.replace(/[’‘]/g, "'").replace(/\s+/g, ' ');
if (process.argv[2]) { process.argv.slice(2).forEach(s => { const i = flat.indexOf(s); console.log((i < 0 ? 'MISS ' : 'FOUND ') + s + (i < 0 ? '' : ' | …' + flat.slice(Math.max(0, i - 120), i + s.length + 120) + '…')); }); process.exit(0); }
const S = ["avaient parlé", "Où habite Henrik", "Que dit une étude", "de bons moments", "des bons moments", "selon laquelle", "auprès de vos", "il s'agit de", "Je lui offre mon", "nécessaire que notre fils", "dans deux ou trois semaines", "plus mauvais", "vieille voiture", "plus vieux que", "cheveux châtains", "vu un film", "arrête de stresser", "Il fait toujours de la boxe", "dernière voyelle", "être là pour lui", "retournera en Allemagne", "week-end d'intégration", "le/la pote", "roux", "en raison de", "s'appliquent également", "courrier électronique", "Joyeux anniversaire", "Bon anniversaire", "à vélo", "Heureux", "paddle", "padel", "pire"];
const near = (s, n = 160) => { const i = flat.indexOf(s); return i < 0 ? '' : flat.slice(Math.max(0, i - n / 2), i + s.length + n / 2); };
S.forEach(s => { const c = flat.split(s).length - 1; console.log((c ? 'FOUND ' + c : 'MISS   ') + ' | ' + s + (c ? ' | …' + near(s) + '…' : '')); });
