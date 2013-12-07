(function(window) {
  window.a = window.a || {};
  window.a.test = function() {
    return 'test';
  };
})(this);


define('a', function() {  });
function b() {
  return {
    message: 'Wow, evil, no IIFE',
    b: 5,
    c: {
      d: null,
      e: {}
    }
  };
}


define('b', function() {  });