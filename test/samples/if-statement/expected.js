function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  for (var i = 0; i < $_args.length; i++) {
    console.log($_args[i]);
  }
  if (whatever) {
    console.log($_args);
  } else {
    console.log($_args.length);
  }
  return $_args;
}
foobar();
