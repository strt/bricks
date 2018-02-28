'use strict';

process.env.NODE_ENV = 'production';

const log = require('../utils/log');

log.info('Creating production optimized assets...');

require('../utils/startTaskRunner')();
