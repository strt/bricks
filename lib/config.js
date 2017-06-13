const deepmerge = require('deepmerge');
const timestamp = require('./utils/timestamp');

module.exports = {
  config: null,
  init(config) {
    this.config = deepmerge({
      source: 'src',
      output: 'dist',
      browsers: ['ie 11', 'last 2 versions', '> 5% in SE'],
      images: {
        path: 'images',
      },
      icons: {
        path: 'icons',
      },
      styles: {
        path: 'styles',
        entries: ['./main.scss'],
      },
      scripts: {
        path: 'scripts',
        publicPath: '',
        entries: ['./main.js'],
      },
      serve: {
        notify: false,
        open: false,
        reloadOnRestart: true,
        logFileChanges: false,
        logPrefix: timestamp(),
        files: ['**/*.html', '**/*.twig'],
      },
    }, config, { arrayMerge: (dest, src) => src });
  },
  get() {
    return this.config;
  },
};
