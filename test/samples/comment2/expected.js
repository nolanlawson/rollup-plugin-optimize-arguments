function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  // comment goes here !
  /* and another */
     /*
     * and hey here's another
     * comment
     * for you */
    // hope you enjoy my comments
  for (var i = 0; i < arguments.length; i++) {
    console.log($_args[i]);
  }
  return $_args;
}
foobar();