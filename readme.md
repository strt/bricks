# Bricks
> A zero-configuration toolkit for building modern web apps 

[![npm](https://img.shields.io/npm/v/@strt/bricks.svg)](https://www.npmjs.com/package/@strt/bricks) 
[![npm](https://img.shields.io/npm/dm/@strt/bricks.svg)](https://www.npmjs.com/package/@strt/bricks)

Bricks is a dev-toolkit for developing modern web apps without the need of configuring `Webpack`, `Babel`, `gulp` etc. It comes with sane defaults but also allows for customization. 

## Contents
- [Install](#install)
- [Usage](#usage)
- [Custom configuration](#custom-configuration)
  - [Directories](#directories)
  - [Styles](#styles)
  - [Scripts](#scripts)
  - [BrowserSync](#browsersync)
  - [Autoprefixer](#autoprefixer)
  - [Babel](#babel)
- [FAQ](#faq)

## Install
```bash
$ npm install -D @strt/bricks
```

## Usage
Bricks comes with these built in commands

#### `bricks dev` 
Builds the project for development.

#### `bricks build` 
Builds the project for production which minifies and optimizes assets. Sourcemaps are also generated.

You can use them directly with npx, e.g. `npx bricks build`. But it's recommended to add them as scripts to your `package.json`

```json
{
  "scripts": {
    "dev": "bricks",
    "build": "bricks build"
  }
}
```

## Custom configuration
For custom advanced behavior of Bricks, create a `bricks.config.js` file in the root of your project directory. 

```javascript
// bricks.config.js
module.exports = {
  // Your custom configuration
}
```

### Directories
```javascript
// bricks.config.js
module.exports = {
  source: 'src',
  output: 'dist',
}
```

### Styles
```javascript
// bricks.config.js
module.exports = {
  styles: {
    path: 'styles',
    entries: ['./app.scss'],
  }
}
```

### Scripts
```javascript
// bricks.config.js
module.exports = {
  scripts: {
    path: 'scripts',
    entries: ['./app.js'],
    publicPath: '', 
  }
}
```

With named multiple or named entries
```javascript
// bricks.config.js
module.exports = {
  scripts: {
    entries: {
      app: './app.js',
      polyfills: './polyfills.js',
    },
  }
}
```

### BrowserSync
To set a [BrowserSync](https://www.browsersync.io) configuration, add a `browserSync` property to the `bricks.config.js` file. The configuration will be forwarded directly to [BrowserSync](https://www.browsersync.io/docs/options).

```javascript
// bricks.config.js
module.exports = {
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
To customize which browsers you want to target, add a [browserslist](https://github.com/ai/browserslist) property to your `package.json` and define which browsers you want to support. This affects both `autoprefixer` and `babel`.

```json
{
  "browserslist": "last 2 versions, ie 11"
}
```

### Babel
To extend the usage of `babel`, create a `.babelrc` in the root of your project directory. This file will overwrite the default babel config. You need to add the `@strt/bricks/babel` preset if you only want to extend the default config. 

```json
{
  "presets": ["@strt/bricks/babel"],
  "plugins": []
}
```

## FAQ
<p>
  <details>
  <summary><b>Scripts not updating</b></summary>
  <ul>
    <li>Make sure that `scripts.publicPath` is set correctly.</li>
  </ul>
  </details>
</p>

## License
MIT © [Strateg Marknadsföring](https://github.com/strt)
