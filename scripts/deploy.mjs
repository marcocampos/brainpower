// Do not print child-process output: redaction alone cannot guarantee log safety.
import { spawn } from 'node:child_process';
import { readdir, readFile, lstat } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const secrets = ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'].map(name => process.env[name]);
if (secrets.some(value => !value)) {
  console.error('Deployment credentials are missing. Check production environment secrets.');
  process.exit(1);
}
const patterns = secrets.flatMap(value => [value, Buffer.from(value).toString('base64'), Buffer.from(value).toString('hex'), encodeURIComponent(value)]).map(value => Buffer.from(value));
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if ((await lstat(path)).isSymbolicLink()) throw new Error('Symlinks are not allowed in public assets.');
    if (entry.isDirectory()) await inspect(path);
    else {
      if (/^(?:\.env(?:\..*)?|.*\.(?:pem|key|p12|pfx))$/i.test(entry.name)) throw new Error('A prohibited file exists in public assets.');
      const bytes = await readFile(path);
      if (patterns.some(pattern => bytes.includes(pattern))) throw new Error('A credential was detected in public assets.');
    }
  }
}
try { await inspect(resolve('dist')); }
catch {
  console.error('Public-asset security check failed. Nothing was uploaded.');
  process.exit(1);
}
// A deliberately minimal environment excludes GitHub credentials and debug flags.
const env = {
  PATH: process.env.PATH,
  HOME: process.env.HOME,
  TMPDIR: process.env.TMPDIR || '/tmp',
  CLOUDFLARE_API_TOKEN: secrets[0],
  CLOUDFLARE_ACCOUNT_ID: secrets[1],
  WRANGLER_SEND_METRICS: 'false',
  CI: 'true',
};
const child = spawn(process.execPath, [resolve('node_modules/wrangler/bin/wrangler.js'), 'pages', 'deploy', 'dist', '--project-name=brainpower-awesome-flavors', '--branch=main'], { env, stdio: 'ignore' });
child.on('error', () => { console.error('Deployment tool could not start. No private output was published.'); process.exitCode = 1; });
child.on('exit', code => {
  if (code === 0) console.log('Deployment succeeded: https://brainpower-awesome-flavors.pages.dev');
  else { console.error('Deployment failed. Inspect Cloudflare deployment status; private CLI output is intentionally suppressed.'); process.exitCode = 1; }
});
