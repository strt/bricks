const arg = require('arg');
const log = require('../utils/log');

const args = arg({
  // Types
  '--help': Boolean,
  '--no-compress': Boolean,

  // Aliases
  '--h': '-help',
});

if (args['--help']) {
  console.log(`
Description
  Compiles the application for production deployment

Usage
  $ bricks build

Options
  --no-compress   Build assets without minification
  --help, -h      Displays this message
`);
  process.exit(0);
}

if (args['--no-compress']) {
  process.env.BRICKS_COMPRESS = false;
}

log.info('Creating production optimized assets...');

require('../utils/startTaskRunner')();
