const env = process.env.NODE_ENV;
const isDevelopment = env === 'development';
const isProduction = env === 'production';
const isTest = env === 'test';

const useESModules = !isTest;

module.exports = () => {
  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
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
        require.resolve('@babel/preset-react'),
        { useBuiltIns: true, development: isDevelopment || isTest },
      ],
    ],
    plugins: [
      [
        require.resolve('babel-plugin-transform-async-to-promises'),
        {
          inlineHelpers: true,
          externalHelpers: true,
        },
      ],
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true },
      ],
      [
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        { useBuiltIns: true },
      ],
      [
        require.resolve('@babel/plugin-transform-runtime'),
        { useESModules, regenerator: false },
      ],
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      isTest && require.resolve('babel-plugin-dynamic-import-node'),
      isProduction && [
        require.resolve('babel-plugin-transform-react-remove-prop-types'),
        {
          removeImport: true,
        },
      ],
      require.resolve('babel-plugin-macros'),
    ].filter(Boolean),
  };
};
