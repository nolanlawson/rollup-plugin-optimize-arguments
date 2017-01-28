function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  var len = arguments.length;
  console.log(len);
  return $_args;
}

export default foobar;
