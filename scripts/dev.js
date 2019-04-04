const arg = require('arg');
const log = require('../utils/log');

const args = arg({
  // Types
  '--help': Boolean,

  // Aliases
  '--h': '-help',
});

if (args['--help']) {
  console.log(`
Description
  Starts development server

Usage
  $ bricks dev

Options
  --help, -h      Displays this message
`);
  process.exit(0);
}

log.info('Starting development scripts...');

require('../utils/startTaskRunner')();
