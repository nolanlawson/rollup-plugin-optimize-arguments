function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  for (var i = 0; i < arguments.length; i++) {
    console.log($_args[i]);
  }
  if (whatever) {
    console.log($_args);
  } else {
    console.log(arguments.length);
  }
  return $_args;
}
foobar();