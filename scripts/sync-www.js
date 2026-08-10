// Copies the dev-root web files into www/, the folder Capacitor packages into
// native apps. Root stays the live copy the dev server (and every editor session)
// points at — this script is the one-way bridge from "what you're editing" to
// "what ships in the app." Run via `npm run sync-www` or any `npm run cap:*` script.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WWW = path.join(ROOT, 'www');
const FILES = ['index.html', 'manifest.json', 'sw.js', 'icon-512.png', 'icon-192.png', 'icon-180.png', 'privacy-policy.html'];

fs.mkdirSync(WWW, { recursive: true });
for (const f of FILES) {
  fs.copyFileSync(path.join(ROOT, f), path.join(WWW, f));
  console.log('synced', f);
}
console.log('www/ is up to date with root.');
