#!/usr/bin/env node

const execa = require('execa');
const arg = require('arg');
const semver = require('semver');
const pkg = require('../package.json');
const log = require('../utils/log');

if (!semver.satisfies(process.version, pkg.engines.node)) {
  log.error(
    `Required node version ${
      pkg.engines.node
    } does not satisfy current version ${process.version}`,
  );
  process.exit(0);
}

const defaultCommand = 'dev';
const commands = new Set([defaultCommand, 'build']);

const args = arg(
  {
    // Types
    '--help': Boolean,
    '--version': Boolean,

    // Aliases
    '-v': '--version',
    '-h': '--help',
  },
  {
    permissive: true,
  },
);

if (args['--version']) {
  console.log(`Bricks v${pkg.version}`);
  process.exit(0);
}

const input = args._[0];
const foundCommand = commands.has(input);

if (!foundCommand && args['--help']) {
  console.log(`
Usage
  $ bricks <command>

Available commands
  ${Array.from(commands).join(', ')}

Options
  --version, -v   Version number
  --help, -h      Displays this message

For more information run a command with the --help flag
  $ bricks build --help
`);
  process.exit(0);
}

if (!foundCommand && !!input) {
  console.log(`Unknown command "${input}"`);
  process.exit(0);
}

const command = foundCommand ? input : defaultCommand;
const forwardedArgs = foundCommand ? args._.slice(1) : args._;

if (args['--help']) {
  forwardedArgs.push('--help');
}

const defaultEnv = command === 'dev' ? 'development' : 'production';
process.env.NODE_ENV = process.env.NODE_ENV || defaultEnv;

const bin = require.resolve(`../scripts/${command}`);

execa('node', [bin, ...forwardedArgs], {
  stdio: 'inherit',
}).catch(e => {
  log.error('Unknown error', e.toString());
  process.exit(0);
});
