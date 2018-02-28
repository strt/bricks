'use strict';

process.env.NODE_ENV = 'development';

const log = require('../utils/log');

log.info('Starting development scripts...');

require('../utils/startTaskRunner')();
