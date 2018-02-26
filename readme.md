# Bricks
> Minimalistic build tool

[![npm version](https://badge.fury.io/js/%40strt%2Fbricks.svg)](https://badge.fury.io/js/%40strt%2Fbricks)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Setup](#setup)
- [Commands](#commands)
- [Configuration](#configuration)
  - [Directories](#directories)
  - [Styles](#styles)
  - [Scripts](#scripts)
  - [BrowserSync](#browsersync)
  - [Autoprefixer](#autoprefixer)
  - [Babel](#babel)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

Install it
```bash
$ yarn add -D @strt/bricks
# or
$ npm install --D @strt/bricks 
```

and add these scripts to your `package.json` 
```json
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
module.exports = {
  // Your options
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
```javascript
{
  scripts: {
    path: 'scripts',
    entries: ['./main.js'],
    publicPath: '', 
  }
}
```

With named multiple or named entries
```javascript
{
  scripts: {
    entries: {
      app: './main.js',
      polyfills: './polyfills.js',
    },
  }
}
```

### BrowserSync
All options are sent forwarded directly to [BrowserSync](https://www.browsersync.io/docs/options)
```javascript
{
  browserSync: {
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

### Autoprefixer
Add a [browserslist](https://github.com/ai/browserslist) property to your `package.json`.

### Babel
Add a `.babelrc` to your project root directory and add `@strt/bricks/babel` as a preset. 

```json
// .babelrc
{
  "presets": ["@strt/bricks/babel"],
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```
