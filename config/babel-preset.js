module.exports = {
  presets: [
    [
      'env',
      {
        modules: false,
        useBuiltIns: true,
      },
    ],
  ],
  plugins: [
    'transform-decorators-legacy',
    'transform-class-properties',
    ['transform-object-rest-spread', { useBuiltIns: true }],
    ['transform-react-jsx', { useBuiltIns: true }],
    'syntax-dynamic-import',
  ],
};
