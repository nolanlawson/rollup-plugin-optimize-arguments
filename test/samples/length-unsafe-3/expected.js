function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  var len = arguments.length;
  return SOME_GLOBAL_CONDITION ? len : $_args;
}

export default foobar;
