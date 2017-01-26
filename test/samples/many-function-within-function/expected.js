function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  console.log($_args);
  (function foobaz() {
    var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
    console.log($_args);
    (function () {
      var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
      console.log($_args);
      var toto = function () {
        var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
        console.log($_args);
        !function() {
          var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
          console.log($_args);
        }();
      };
      toto();
    })();
  })();
}
foobar();
