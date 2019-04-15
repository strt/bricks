const env = process.env.NODE_ENV;
const isDevelopment = env === 'development';
const isProduction = env === 'production';
const isTest = env === 'test';

const useESModules = !isTest;

module.exports = () => {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isTest ? 'commonjs' : false,
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
        { useBuiltIns: true, development: isDevelopment || isTest },
      ],
    ],
    plugins: [
      [
        'babel-plugin-transform-async-to-promises',
        {
          inlineHelpers: true,
          externalHelpers: true,
        },
      ],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
      ['@babel/plugin-transform-runtime', { useESModules, regenerator: false }],
      '@babel/plugin-syntax-dynamic-import',
      isTest && 'babel-plugin-dynamic-import-node',
      isProduction && [
        'babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true,
        },
      ],
      'macros',
    ].filter(Boolean),
  };
};
