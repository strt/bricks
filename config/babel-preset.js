module.exports = {
  presets: [['env', { modules: false }], 'react'],
  plugins: [
    'transform-class-properties',
    ['transform-object-rest-spread', { useBuiltIns: true }],
    'syntax-dynamic-import',
  ],
};
