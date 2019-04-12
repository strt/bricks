module.exports = env => {
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'entry',
          corejs: 3,
          exclude: [
            'transform-typeof-symbol',
            'transform-regenerator',
            'transform-async-to-generator',
          ],
        },
      ],
      [
        '@babel/preset-react',
        { useBuiltIns: true, development: isDevelopment },
      ],
    ],
    plugins: [
      [
        'babel-plugin-transform-async-to-promises',
        {
          inlineHelpers: true,
        },
      ],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
      [
        '@babel/plugin-transform-runtime',
        { useESModules: true, regenerator: false },
      ],
      '@babel/plugin-syntax-dynamic-import',
      'macros',
      isProduction && [
        'babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true,
        },
      ],
    ].filter(Boolean),
  };
};
