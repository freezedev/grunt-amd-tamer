# grunt-amd-tamer

[![Build Status](https://travis-ci.org/freezedev/grunt-amd-tamer.png?branch=master)](https://travis-ci.org/freezedev/grunt-amd-tamer)
[![Dependency Status](https://david-dm.org/freezedev/grunt-amd-tamer.png)](https://david-dm.org/freezedev/grunt-amd-tamer)
[![devDependency Status](https://david-dm.org/freezedev/grunt-amd-tamer/dev-status.png)](https://david-dm.org/freezedev/grunt-amd-tamer#info=devDependencies)

This module helps you manage your AMD modules. It converts anonymous modules into named ones, allows to add shims,
add namespaces to modules, concatenate them all into a single file or leave them in separate files.
In a way it's similar to the RequireJS bundler, but `grunt-amd-tamer` allows for more fine-grained control.

## Getting Started
This plugin requires Grunt `^0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-amd-tamer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-amd-tamer');
```

## The "amd_tamer" task

### Overview
In your project's Gruntfile, add a section named `amd_tamer` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  amd_tamer: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
})
```

You can then call the task using `grunt amd_tamer`.

### Usage Examples

#### Default Options
In this example, the default options are used to do get a bunch javascript files and set `src/` as a base for all modules.

```js
grunt.initConfig({
  amd_tamer: {
    options: {
      base: 'src/'
    },
    files: {
      'dest/file.js': ['src/**/*.js'],
    }
  }
})
```

Sometimes you dont' want to have all the AMD modules in one file though. Here is an example to make anonymous modules
named, but leave them in separate files:

```js
grunt.initConfig({
  amd_tamer: {
    options: {
      base: 'src/'
    },
    files: [{
      expand: true,
      cwd: 'src/',
      src: ['**/*.js']
      dest: 'tmp/'
    }]
  }
})
```

#### Advanced Options
In this example, the `base` options is set as well. Also, all anonymous get the `test` namespace. There are also some shims defined for modules that are not an AMD module.

```js
grunt.initConfig({
  amd_tamer: {
    options: {
      base: 'src/',
      namespace: 'test',
      shim: {
        a: {
          exports: 'a.test'
        },
        b: {
          deps: ['a'],
          exports: 'b'
        }
      }
    },
    files: {
      'dest/file.js': ['src/**/*.js'],
    }
  }
})
```

### Options

#### options.separator
Type: `String`
Default value: `grunt.util.linefeed`

The separator between files. Usually, you don't need to change this

#### options.normalizeIndexFile
Type: `Boolean`
Default value: `true`

Mimics CommonJS behavior with `index.js` files. An anonymous module that with `index.js` as its filename will resolve to its parent folder, e.g. a module named `folder/index` will become `folder`.

#### options.base
Type: `String`
Default value: `null`

Cuts off the string provided from the module name, e.g. if `src/` is provided, `src/mymodule` will be `mymodule`

#### options.doubleQuotes
Type: `Boolean`
Default value: `false`

If set to true, generated module names and shims are wrapped in double quotes instead of single quotes.

#### options.namespace
Type: `String`
Default value: `null`

Prepends a namespace to each module name, e.g. if `test` is set as the namespace, `mymodule` becomes `test/mymodule`.

#### options.processName
Type: `Function`

Allows to define a function to process module names. Keep in mind, only anonymous module are being processed, not named ones.

#### options.process
Type: `Function`

Allows to process the file after transformation

#### options.shim
Type: `Object`

Similar to RequireJS shims property. Allows to export symbols for non-AMD modules.

#### options.modules
Type: `Object`

Allows to manually define module which will be appended to the destination file.

#### options.sourceMap
Type: `Boolean`
Default value: `true`

Generates a source map for the generated files. The source mapping URL does not get appended automatically though,
you need handle that manually using `options.footer`.

#### options.blacklist
Type: `Array`

Module names inside the blacklist will not be transformed, only concatenated 
to the output file. This is especially useful if your goal is to have only a 
single JavaScript file in the end.

#### options.banner
Type: `String` or `Function`

Prepend something to the resulting file, like a copyright notice.

#### options.footer
Type: `String` or `Function`

Append something to the resulting file, like a source map reference.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.13 sourceMap comments are not being handled in source files  
0.1.12 Fixes a bug with source map mappings where an input source maps wasn't specified  
0.1.11 Add banner and footer option  
0.1.10 Hotfix for including sourcemaps + Additional unit test  
0.1.9  Initial sourcemap support + Added blacklist option  
0.1.8  Added process option  
0.1.7  Improved RequireJS compatibility  
0.1.6  Unit tests + Documentation  
0.1.5  Updated devDependencies to current version + Travis CI configuration  
0.1.4  Initial CoffeeScript support  
0.1.3  Improved error handling  
0.1.2  Namespace options hotfix  
0.1.1  Added options for namespace, basename and processName  
0.1.0  Initial version  

## License
Public domain (Unlicense), but can also be licensed under the terms of the MIT 
license. Choose the one that fits your purpose best.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/freezedev/grunt-amd-tamer/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

