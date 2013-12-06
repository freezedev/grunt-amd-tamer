define('test/a/b/file', ['a', 'b'], function(a, b) {
  return a + b;
});

define('test/a/b', function() {
  return {
    a: 4,
    b: 6
  };
});

define('named1', function() {
  return "it's alive!";
});

define('named2', ['b'], function() {
  return "it's alive!";
});
define('test/a/file', ['a', 'b'], function(a, b) {
  return a + b;
});

define('test/a', function() {
  return {
    a: 4,
    b: 6
  };
});

define('named1', function() {
  return "it's alive!";
});

define('named2', ['b'], function() {
  return "it's alive!";
});
define('test/file', ['a', 'b'], function(a, b) {
  return a + b;
});

define('test/index', function() {
  return {
    a: 4,
    b: 6
  };
});

define('named1', function() {
  return "it's alive!";
});

define('named2', ['b'], function() {
  return "it's alive!";
});