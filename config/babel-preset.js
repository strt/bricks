module.exports = {
  presets: [
    [
      'env',
      {
        modules: false,
        useBuiltIns: true,
      },
    ],
    'react',
  ],
  plugins: [
    'transform-class-properties',
    ['transform-object-rest-spread', { useBuiltIns: true }],
    'syntax-dynamic-import',
  ],
};
