# Bricks [![npm](https://img.shields.io/npm/v/@strt/bricks.svg)](https://www.npmjs.com/package/@strt/bricks) [![npm](https://img.shields.io/npm/dm/@strt/bricks.svg)](https://www.npmjs.com/package/@strt/bricks)

> A zero-configuration toolkit for building modern web apps 

Bricks is a dev-toolkit for developing modern web apps without the need of configuring `Webpack`, `Babel`, `gulp` etc. It comes with sane defaults but also allows for customization. 

## Contents
- [Install](#install)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Options](#options)
  - [Browsers](#browsers)
  - [Babel](#babel)
- [FAQ](#faq)

## Install
```bash
$ npm install -D @strt/bricks
```

... then add the scripts to your `package.json`
```json
{
  "scripts": {
    "dev": "bricks",
    "build": "bricks build"
  }
}
```

## Usage
Bricks includes two commands – `dev` (default) and `build`. Neither requires any arguments.

### `bricks` / `bricks dev` 
Builds the project for development.

### `bricks build` 
Builds the project for production which minifies and optimizes assets. Sourcemaps are also generated.

## Configuration
For custom advanced behavior of Bricks, create a `bricks.config.js` file in the root of your project directory. 

```javascript
// bricks.config.js
module.exports = {
  // Your custom configuration
}
```
### Options
| Name | Type | Default | Description |
| :-: | :--: | :--: | --- |
| `source` | `{String}` | `'src'` | Path to source directory |
| `output` | `{String}` | `'dist'` | Path to output directory |
| `publicPath` | `{String}` | `''` | For more detailed information, visit the [Webpack documentation](https://webpack.js.org/configuration/output/#output-publicpath).|
| `browserSync` | `{Object}` | [Default](https://github.com/strt/bricks/blob/next/config/config.js#L39-L46) | Options to pass to [BrowserSync](https://www.browsersync.io/docs/options) |
| `files` | `{Function}` | [Default](https://github.com/strt/bricks/blob/next/config/config.js#L30-L38) | Function to define which files are static |
| `images.path` | `{String}` | `images` | Path to images directory |
| `icons.path` | `{String}` | `icons` | Path to icons directory |
| `webpack` | `{Function}` | `null` | Function to extend the use of `webpack` |

#### `source`
```javascript
// bricks.config.js
module.exports = {
  source: 'src',
}
```

#### `output`
```javascript
// bricks.config.js
module.exports = {
  output: 'dist',
}
```

#### `publicPath`
For more detailed information about the `publicPath` option, visit the [Webpack documentation](https://webpack.js.org/configuration/output/#output-publicpath).
```javascript
// bricks.config.js
module.exports = {
  publicPath: '/webdav/files/dist/',
}
```

#### `styles`
```javascript
// bricks.config.js
module.exports = {
  styles: {
    path: 'styles',
    entries: ['./app.scss'],
  }
}
```

#### `scripts`
```javascript
// bricks.config.js
module.exports = {
  scripts: {
     path: 'scripts',
    entries: {
      app: './app.js',
      polyfills: './polyfills.js',
    },
  }
}
```

#### `webpack`
To extend the usage of `webpack`, define a function that extends the config via `bricks.config.js`.

```javascript
// bricks.config.js
module.exports = {
  webpack: (config, { isDev }) => {
    // Perform the customizations to the config
    return config;
  }
}
```

#### `browserSync`
To set a `BrowserSync` configuration, add a `browserSync` property to the `bricks.config.js`. Visit the [BrowserSync documentation](https://www.browsersync.io/docs/options) for more detailed information.

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

### Browsers
To customize which browsers you want to target, add a [browserslist](https://github.com/ai/browserslist) property to your `package.json` and define the browsers you want. This affects both `autoprefixer` and `babel`.

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
  Make sure that the `scripts.publicPath` is set correctly.
  </details>
</p>

## License
MIT © [Strateg Marknadsföring](https://github.com/strt)
