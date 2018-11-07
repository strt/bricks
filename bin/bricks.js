#!/usr/bin/env node

const execa = require('execa');
const meow = require('meow');
const semver = require('semver');
const pkg = require('../package.json');
const log = require('../utils/log');

if (!semver.satisfies(process.version, pkg.engines.node)) {
  log.error(
    `Required node version ${
      pkg.engines.node
    } not satisfied with current version ${process.version}`,
  );
  process.exit(0);
}

const defaultCommand = 'dev';
const commands = new Set([defaultCommand, 'build']);

const cli = meow(`
  Usage
    $ bricks <command>

  Commands
    ${Array.from(commands).join(', ')}
`);

let cmd = cli.input[0];

if (cmd && !commands.has(cmd)) {
  log.error(
    `Unknown command "${cmd}". Use the --help flag to list available commands.`,
  );
  process.exit(0);
}

if (!commands.has(cmd)) {
  cmd = defaultCommand;
}

execa('node', [require.resolve(`../scripts/${cmd}`)], {
  stdio: 'inherit',
}).catch((e) => {
  log.error('Unknown error', e.toString());
  process.exit(0);
});