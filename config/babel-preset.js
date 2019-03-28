module.exports = env => {
  const isEnvDevelopment = env === 'development';

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'entry',
          corejs: 3,
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        '@babel/preset-react',
        { useBuiltIns: true, development: isEnvDevelopment },
      ],
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
      ['@babel/plugin-transform-runtime', { useESModules: true }],
      '@babel/plugin-syntax-dynamic-import',
      'macros',
    ],
  };
};
