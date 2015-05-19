'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var normalizeRead = function(filename) {
  var text = grunt.file.read(filename);

  return text.replace(/\s/g, '');
};

exports.amd_tamer = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  javascript_simple: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/javascript_simple.js');
    var expected = normalizeRead('test/expected/javascript_simple.js');
    test.equal(actual, expected, 'Simple JavaScript test');

    test.done();
  },
  javascript_dots: function(test) {
    test.expect(1);
    
    var actual = normalizeRead('tmp/javascript_dots.js');
    var expected = normalizeRead('test/expected/javascript_dots.js');
    test.equal(actual, expected, 'JavaScript files with dots in file and module names');
    
    test.done();
  },
  javascript_namespace: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/javascript_namespace.js');
    var expected = normalizeRead('test/expected/javascript_namespace.js');
    test.equal(actual, expected, 'Namespace JavaScript test');

    test.done();
  },
  javascript_nodefine: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/javascript_nodefine.js');
    var expected = normalizeRead('test/expected/javascript_nodefine.js');
    test.equal(actual, expected, 'No-define JavaScript test');

    test.done();
  },
  javascript_noindex: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/javascript_noindex.js');
    var expected = normalizeRead('test/expected/javascript_noindex.js');
    test.equal(actual, expected, 'No-index JavaScript test');

    test.done();
  },
  javascript_noindex_namespace: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/javascript_noindex_namespace.js');
    var expected = normalizeRead('test/expected/javascript_noindex_namespace.js');
    test.equal(actual, expected, 'No-index namespaced JavaScript test');

    test.done();
  },
  javascript_shim: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/javascript_shim.js');
    var expected = normalizeRead('test/expected/javascript_shim.js');
    test.equal(actual, expected, 'Shimmed JavaScript test');

    test.done();
  },
  javascript_processname: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/javascript_processname.js');
    var expected = normalizeRead('test/expected/javascript_processname.js');
    test.equal(actual, expected, 'Processname JavaScript test');

    test.done();
  },
  coffeescript_default: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/coffeescript_default.coffee');
    var expected = normalizeRead('test/expected/coffeescript_default.coffee');
    test.equal(actual, expected, 'CoffeeScript default test');

    test.done();
  },
  coffeescript_nodefine: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/coffeescript_nodefine.coffee');
    var expected = normalizeRead('test/expected/coffeescript_nodefine.coffee');
    test.equal(actual, expected, 'CoffeeScript nodefine test');

    test.done();
  },
  coffeescript_shim: function(test) {
    test.expect(1);

    var actual = normalizeRead('tmp/coffeescript_shim.coffee');
    var expected = normalizeRead('test/expected/coffeescript_shim.coffee');
    test.equal(actual, expected, 'Shimmed CoffeeScript test');

    test.done();
  }
};
