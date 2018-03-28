module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false, targets: { browsers: ['ie 11'] } }],
    ['@babel/preset-react', { useBuiltIns: true }],
  ],
  plugins: [
    '@babel/plugin-proposal-transform-class-properties',
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
  ],
};
