define('file', ['a', 'b'], function(a, b) {
  return a + b;
});

define('index', function() {
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