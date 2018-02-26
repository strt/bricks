const timestamp = require('../utils/timestamp');

module.exports = {
  source: 'src',
  output: 'dist',
  images: {
    path: 'images',
  },
  icons: {
    path: 'icons',
  },
  styles: {
    path: 'styles',
    entries: ['./main.scss'],
    postcssPlugins: [],
  },
  scripts: {
    path: 'scripts',
    publicPath: '',
    entries: ['./main.js'],
  },
  getFilesGlob(config = this) {
    return [
      `${config.source}/**`,
      `!${config.source}/${config.images.path}{,/**}`,
      `!${config.source}/${config.icons.path}{,/**}`,
      `!${config.source}/${config.styles.path}{,/**}`,
      `!${config.source}/${config.scripts.path}{,/**}`,
    ];
  },
  browserSync: {
    notify: false,
    open: false,
    reloadOnRestart: true,
    logFileChanges: false,
    logPrefix: timestamp(),
    files: ['**/*.html', '**/*.twig'],
  },
  browserslist: [
    'ie 11',
    'last 2 Edge versions',
    'last 2 Firefox versions',
    'last 2 Chrome versions',
    'last 2 Safari versions',
    'last 2 iOS versions',
    'last 2 ChromeAndroid versions',
  ],
  webpack: null,
};
