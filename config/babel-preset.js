module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: false,
      },
    ],
    ['@babel/preset-react', { useBuiltIns: true }],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-syntax-dynamic-import',
    'macros',
  ],
});
