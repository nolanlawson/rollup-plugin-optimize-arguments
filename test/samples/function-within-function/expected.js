function foobar() {
  (function () {
    var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
    console.log($_args);
  })();
}
foobar();
