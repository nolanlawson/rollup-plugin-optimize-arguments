function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  console.log(arguments['length']);
  var args = $_args;
  return function () {
    return args[i];
  };
}

export default foobar;