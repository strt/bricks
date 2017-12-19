# Bricks
> Minimalistic build tool

[![npm version](https://badge.fury.io/js/%40strt%2Fbricks.svg)](https://badge.fury.io/js/%40strt%2Fbricks)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- https://github.com/thlorenz/doctoc -->

- [Setup](#setup)
- [Commands](#commands)
- [Configuration](#configuration)
  - [Directories](#directories)
  - [Styles](#styles)
  - [Scripts](#scripts)
  - [BrowserSync](#browsersync)
  - [Browsers](#browsers)
  - [Babel](#babel)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

Install it
```bash
$ yarn add --dev @strt/bricks
# or
$ npm install --only=dev @strt/bricks 
```

and add scripts to your `package.json` 
```javascript
// package.json
{
  "scripts": {
    "dev": "bricks",
    "build": "bricks build"
  }
}
```

## Commands
- `bricks` Builds the project for development 
- `bricks build` Builds the project for production (minifies scripts, optimizes images etc)

## Configuration
For custom configuration, create a `bricks.config.js` file in the root of your project directory. 

```javascript
// bricks.config.js
module.exports = {
  // Config options
}
```

Alternatively you can add the configuration in your `package.json`
```javascript
// package.json
{
  "bricks": {
    // Config options
  }
}
```

### Directories
```javascript
{
  source: 'source',
  output: 'dist',
}
```

### Styles
```javascript
{
  styles: {
    path: 'styles',
    entries: ['./main.scss'],
  }
}
```

### Scripts
Check Webpacks documentation for [publicPath](https://webpack.js.org/guides/public-path/)
```javascript
{
  scripts: {
    path: 'scripts',
    entries: ['./main.js'],
    publicPath: '', 
  }
}
```

With named multiple or named enties
```javascript
{
  scripts: {
    entries: {
      main: './main.js',
      polyfills: './polyfills.js',
    },
  }
}
```

### BrowserSync
All options are sent forwarded directly to [BrowserSync](https://www.browsersync.io/docs/options)
```javascript
{
  serve: {
    proxy: 'strateg.se',
    serveStatic: [
      {
        route: '/webdav/files/resources',
        dir: 'dist'
      }
    ]
  }
}
```

### Browsers
To customize which browsers you want autoprefixer to prefix. Add a [browserslist](https://github.com/ai/browserslist) property to your `package.json`.

### Babel
Add a `.babelrc` to your project root directory. Bricks will merge it with the built-in babel config. 

```json
// .babelrc
{
  "presets": ["@strt/bricks/babel"],
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```
