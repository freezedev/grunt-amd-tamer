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

exports.amd_tamer = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  javascript_simple: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/javascript_simple.js');
    var expected = grunt.file.read('test/expected/javascript_simple.js');
    test.equal(actual, expected, 'Simple JavaScript test');

    test.done();
  },
  coffeescript: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/coffee.coffee');
    var expected = grunt.file.read('test/expected/coffee.coffee');
    test.equal(actual, expected, 'CoffeeScript test');

    test.done();
  },
};
