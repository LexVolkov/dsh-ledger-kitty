// Bundles the client half into one classic script: the loader only accepts a
// single browser artifact per package, so the sources live in src/ and this
// build produces dist/client.js.
import esbuild from 'esbuild';

const watch = process.argv.includes('--watch');

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ['src/client/index.js'],
  bundle: true,
  format: 'iife',
  globalName: '__ledgerKitty',
  target: ['chrome110'],
  outfile: 'dist/client.js',
  legalComments: 'none',
  footer: {
    js: "window.__ModuleLoader__.load({ id: 'dsh-ledger-kitty', factory(require) { return __ledgerKitty.createPlugin(require); } });",
  },
};

if (watch) {
  const context = await esbuild.context(options);
  await context.watch();
  console.log('ledger-kitty: watching src/ -> dist/client.js');
} else {
  await esbuild.build(options);
  console.log('ledger-kitty: built dist/client.js');
}
