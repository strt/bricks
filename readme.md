# Bricks

> Minimal build process that just works

- [Getting started](#getting-started)
- [User guide](#user-guide)
  - [Available commands](#available-commands)
  - [Configuration](#configuration)
  - [Browser support](#browser-support)
  - [Customize babel config](#customize-babel-config)
  - [Options](#options)

## Getting started

Add Bricks as a devDependency
```bash
$ yarn add --dev @strt/bricks
# or
$ npm install --dev @strt/bricks
```

Add Bricks to npm scripts
```js
// package.json
{
  ...
  "scripts": {
    "dev": "bricks",
    "build": "bricks build"
  }
}
```

Run `yarn dev` or `npm run dev` to build your project in development mode

## User guide

### Available commands
- `bricks` Builds the project in development mode and watches for changes
- `bricks build` Builds the project for production (minifies scripts, optimizes images etc)

### Configuration
You can define your options in your `package.json` or in a `bricks.config.js` file in the root of your project. 

```js
// package.json
{ 
  ...
  "bricks": {
    // Config options here
  }
}
```

```js
// bricks.config.js
module.exports = {
  // Config options here
}
```

### Browser support
To customize which browsers you want autoprefixer to prefix simple add a [browserslist](https://github.com/ai/browserslist) property to your `package.json`.

```js
{
  ...
  "browserslist": [
    "ie 11",
    "last 2 versions"
  ]
}
```

### Customize babel config
Add a `.babelrc` to the root of your project. Bricks will find it and merge it with the built-in babel config. 

Here is an example of a `.babelrc` file:
```js
{
  "preset": [
    ["env", { "modules": false }], 
    "react"
  ],
  "plugins": [
    "transform-decorators-legacy"
  ]
}
``` 

### Options

#### Source
Path to the source folder

<details>
  <summary>Example</summary>

  ```js
  {
    ...
    source: 'src'
  }
  ```
</details>

#### Output
Path to the dist folder

<details>
  <summary>Example</summary>

  ```js
  {
    ...
    output: 'src'
  }
  ```
</details>

#### Styles
Path to the styles folder

<details>
  <summary>Example</summary>

  ```js
  {
    ...
    styles: {
      path: 'styles'
    }
  }
  ```
</details>

#### Scipts
Path to the dist folder

<details>
  <summary>Example</summary>

  ```js
  {
    ...
    output: 'src'
  }
  ```
</details>

#### Serve
All options are sent directly to [BrowserSync](https://www.browsersync.io/docs/options)

<details>
  <summary>Example</summary>

  ```js
  {
    ...
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
</details>

