/*
 * grunt-amd-tamer
 * https://github.com/freezedev/grunt-amd-tamer
 *
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    amd_tamer: {
      javascript_simple: {
        options: {
          base: 'test/fixtures/js/simple/'
        },
        files: {
          'tmp/javascript_simple.js': ['test/fixtures/js/simple/**/*.js'],
        }
      },
      javascript_nodefine: {
        options: {
          base: 'test/fixtures/js/nodefine/'
        },
        files: {
          'tmp/javascript_nodefine.js': ['test/fixtures/js/nodefine/**/*.js'],
        }
      },
      javascript_noindex: {
        options: {
          base: 'test/fixtures/js/noindex/',
          normalizeIndexFile: false
        },
        files: {
          'tmp/javascript_noindex.js': ['test/fixtures/js/noindex/**/*.js'],
        }
      },
      javascript_noindex_namespace: {
        options: {
          base: 'test/fixtures/js/noindex_namespace/',
          normalizeIndexFile: false,
          namespace: 'test'
        },
        files: {
          'tmp/javascript_noindex_namespace.js': ['test/fixtures/js/noindex_namespace/**/*.js'],
        }
      },
      javascript_namespace: {
        options: {
          base: 'test/fixtures/js/namespace/',
          namespace: 'test'
        },
        files: {
          'tmp/javascript_namespace.js': ['test/fixtures/js/namespace/**/*.js'],
        }
      },
      javascript_processname: {
        options: {
          base: 'test/fixtures/js/processname/',
          processName: function(name) {
            if (name.indexOf('submodule') >= 0) {
              return name.replace('submodule', 'subsubmodule');
            } else {
              return name.replace('named', 'reallynamed');              
            }
          }
        },
        files: {
          'tmp/javascript_processname.js': ['test/fixtures/js/processname/**/*.js'],
        }
      },
      coffeescript_default: {
        options: {
          base: 'test/fixtures/coffee/default/'
        },
        files: {
          'tmp/coffee_default.coffee': ['test/fixtures/coffee/default/**/*.coffee'],
        }
      },
      coffeescript_nodefine: {
        options: {
          base: 'test/fixtures/coffee/nodefine/'
        },
        files: {
          'tmp/coffee_nodefine.coffee': ['test/fixtures/coffee/nodefine/**/*.coffee'],
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },
    
    // Release
    relase: {
      
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'amd_tamer', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
