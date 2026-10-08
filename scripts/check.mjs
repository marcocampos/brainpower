import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve('dist');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
for (const [, path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(?:https?:|data:)/.test(path)) continue;
  await access(resolve(root, path));
}
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Broken section link: ${id}`);
}
if (!html.includes('<title>BrainPower')) throw new Error('Missing product title');
console.log('Static assets, section links, and product metadata verified.');
