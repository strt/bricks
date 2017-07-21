module.exports = {
  presets: [
    ['env', {
      modules: false,
      useBuiltIns: true,
    }],
  ],
  plugins: [
    'transform-class-properties',
    'transform-object-rest-spread',
    'transform-runtime',
    'syntax-dynamic-import',
  ],
};
