define('named1', function() {
  return "it's alive!";
});

define('named2', ['b'], function() {
  return "it's alive!";
});