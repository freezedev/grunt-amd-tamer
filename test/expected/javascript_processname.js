define('folder', ['folder/submodule'], function() {
  return 10;
});

define('folder/subsubmodule', {
  c: 3,
  d: 5
});

define('module', ['a', 'b', 'c'], function() {
  return 5;
});
define('named1', function() {
  return "it's alive!";
});

define('named2', ['b'], function() {
  return "it's alive!";
});