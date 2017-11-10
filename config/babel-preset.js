module.exports = {
  presets: [
    ['env', {
      modules: false,
      useBuiltIns: true,
    }],
  ],
  plugins: [
    'transform-decorators-legacy',
    'transform-class-properties',
    'transform-object-rest-spread',
    'transform-react-jsx',
    'syntax-dynamic-import',
  ],
};
