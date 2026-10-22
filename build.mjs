import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html','styles.css','app.js','core.js','data.js','pokemon.json','icon.svg','manifest.webmanifest']) await copyFile(file, `dist/${file}`);
console.log('Carnet Paldea : 8 fichiers statiques prêts dans dist/.');
