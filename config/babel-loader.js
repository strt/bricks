module.exports = require('babel-loader').custom(babel => {
  const presetItem = babel.createConfigItem(require('./babel-preset'), {
    type: 'preset',
  });

  const configs = new Set();

  return {
    customOptions(options) {
      const custom = {
        isDev: options.isDev,
      };

      const loader = Object.assign({}, options);
      delete loader.isDev;

      return { custom, loader };
    },
    config(cfg) {
      const options = Object.assign({}, cfg.options);

      if (cfg.hasFilesystemConfig()) {
        // eslint-disable-next-line no-restricted-syntax
        for (const file of [cfg.babelrc, cfg.config]) {
          if (file && !configs.has(file)) {
            configs.add(file);
            console.log(`> Using external babel configuration`);
            console.log(`> Location: "${file}"`);
          }
        }
      } else {
        options.presets = [...options.presets, presetItem];
      }

      return options;
    },
  };
});
