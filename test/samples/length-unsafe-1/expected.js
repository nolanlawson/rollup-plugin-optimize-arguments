function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  var args = $_args;
  return function () {
    return args.length;
  }
}

export default foobar;
