/*
 * grunt-amd-tamer
 * https://github.com/freezedev/grunt-amd-tamer
 *
 */

'use strict';

var path = require('path');
var SourceMapConcat = require('sourcemap-concat').SourceMapConcatenator;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('amd_tamer', 'Tame your AMD modules', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: grunt.util.linefeed,
      normalizeIndexFile: true,
      base: null,
      doubleQuotes: false,
      namespace: null,
      sourceMap: true,
      processName: function(name /*, basename */) {
        return name;
      },
      process: function(content /*, moduleName */) {
      	return content;
      },
      banner: '',
      footer: '',
      shim: {},
      modules: {},
      blacklist: []
    });

    var quotes = (options.doubleQuotes) ? '"' : '\'';

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      
      var sourceMapConcat = new SourceMapConcat({file: f.dest});
      
      var src = '';
      
      if (options.banner) {
        var banner = '';
        
        if (typeof options.banner === 'function') {
          banner = options.banner(f.dest);
        } else {
          banner = options.banner;
        }
        
        src += banner;
        
        if (options.sourceMap) {
          sourceMapConcat.add('grunt_amd_tamer-generated-banner.js', banner, null);
        }
      }

      var index = 0;
      var filtered = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
  
      // Concat specified files.
      src += filtered.map(function(filepath) {
        index++;
        
        // Read file source.
        var source = grunt.file.read(filepath);
        var extension = path.extname(filepath);
        var isCoffeeScript = (extension === '.coffee');

        var moduleName = filepath.split(extension)[0];
        if (options.base && moduleName.indexOf(options.base) === 0) {
          moduleName = moduleName.split(options.base)[1];
        }

        if (options.normalizeIndexFile && moduleName.indexOf('/index') > 0) {
          moduleName = moduleName.replace('/index', '');
        }

        if (options.namespace) {
          // If index.js is in the root folder and a namespace has been defined
          // use the namespace as the module name
          if (options.normalizeIndexFile && moduleName === 'index') {
            moduleName = options.namespace;
          } else {
            moduleName = options.namespace + '/' + moduleName;
          }
        }

        moduleName = options.processName(moduleName, path.basename(moduleName));

        var defineStatement = 'define(';

        var defineStartPos = source.indexOf(defineStatement);
        var defineIndex = defineStartPos + defineStatement.length;

        if (isCoffeeScript && defineStartPos === -1) {
          defineStartPos = source.indexOf('define ');
          defineIndex = defineStartPos + defineStatement.length;
          defineStatement = 'define ';
        }

        var quoteIndex = source.substr(defineIndex).search(/('|")/);

        var abortProcessing = false;
        var abortCondition = false;

        if (defineStartPos === -1) {
          abortCondition = true;
        } else {
          if (quoteIndex >= 0 && source.substr(defineIndex, quoteIndex).trim().length === 0) {
            abortCondition = true;
          }
        }
        
        if (options.blacklist.indexOf(moduleName) >= 0) {
          abortProcessing = true;
        }
        

        if (!abortProcessing) {
          if (!abortCondition) {
            source = source.replace(defineStatement, defineStatement + quotes + moduleName + quotes + ', ');
          } else {
            if (source.indexOf(defineStatement) === -1) {
              var deps = '';
              var exports = '';
      
              if (options.shim[moduleName]) {
                if (options.shim[moduleName].deps) {
                  deps = '[' + options.shim[moduleName].deps.map(function(val) { return quotes + val + quotes; }).join(', ') + '], ';
                }
        
                if (options.shim[moduleName].exports) {
                  if (typeof options.shim[moduleName].exports === 'function') {
                    exports = options.shim[moduleName].exports;
                  } else {
                    if (isCoffeeScript) {
                      exports = 'root.' + options.shim[moduleName].exports;
                    } else {
                      exports = 'return root.' + options.shim[moduleName].exports + ';';
                    }
                  }
                }
              }
      
              source += '\n';
      
              if (exports) {
                if (isCoffeeScript) {
                  source += '\ndo (root) ->';
                } else {
                  source += '\n(function(root) {';
                }
              }
              source += '\n';
              if (exports) {
                source += '\t';
              }
      
              if (isCoffeeScript) {
                source += 'define(' + quotes + moduleName + quotes + ', ' + deps + '-> ' + exports + ' )';
              } else {
                if (exports && typeof exports === 'function') {
                  source += 'define(' + quotes + moduleName + quotes + ', ' + deps + exports.toString() + ');';
                } else {
                  source += 'define(' + quotes + moduleName + quotes + ', ' + deps + 'function() { ' + exports + ' });';
                }
              }
      
              if (exports && !isCoffeeScript) {
                source += '\n})(this);';
              }
            }
          }
        }

        source = options.process(source, moduleName);

        if (options.sourceMap) {
          var prevSourceMap;
          var sourceMapFile = filepath + '.map';
          var file;

          var sourceMapComment = '//# sourceMappingURL=';
          var hasSourceMap = source.indexOf(sourceMapComment) >= 0;

          if (hasSourceMap) {
            var smMatch = source.match(/\/\# sourceMappingURL=(.*)/);
            file = smMatch[1];

            var basename = path.basename(filepath);
            var sourceMapPath = filepath.split(basename)[0];

            sourceMapFile = [sourceMapPath, file].join(path.sep);
          }

          if (grunt.file.exists(sourceMapFile)) {
            prevSourceMap = grunt.file.readJSON(sourceMapFile);
          }

          if (hasSourceMap) {
            source = source.split(sourceMapComment + file)[0];
          }

          var fileSource = source;

          if (index !== filtered.length - 1 && !prevSourceMap) {
            fileSource += grunt.util.normalizelf(options.separator);
          }

          sourceMapConcat.add(filepath, source, prevSourceMap);
        }

        return source;
      }).join(grunt.util.normalizelf(options.separator));

      var modules = options.modules;

      var moduleKeys = Object.keys(modules);

      for (var i = 0, j = moduleKeys.length; i < j; i++) {
        (function(key, value) {
          src += 'define(' + quotes + key + quotes + ', ' + value.toString() + ');';
        })(moduleKeys[i], modules[moduleKeys[i]]);
      }
  
      if (options.footer) {
        if (typeof options.footer === 'function') {
          src += options.footer(f.dest);
        } else {
          src += options.footer;
        }
      }

      // Write the destination file.
      grunt.file.write(f.dest, src);
      
      if (options.sourceMap) {
        grunt.file.write(f.dest + '.map', sourceMapConcat.sourceMap);
      }

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
