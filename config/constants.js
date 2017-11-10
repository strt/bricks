const config = require('./index');

exports.STATIC_GLOB = [
  `${config.source}/**`,
  `!${config.source}/${config.images.path}{,/**}`,
  `!${config.source}/${config.icons.path}{,/**}`,
  `!${config.source}/${config.styles.path}{,/**}`,
  `!${config.source}/${config.scripts.path}{,/**}`,
];
