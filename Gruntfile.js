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
          normalizeIndexFile: true
        },
        files: {
          'tmp/javascript_noindex.js': ['test/fixtures/js/noindex/**/*.js'],
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
      coffeescript: {
        options: {
          base: 'test/fixtures/coffee/'
        },
        files: {
          'tmp/coffee.coffee': ['test/fixtures/coffee/**/*.coffee'],
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
