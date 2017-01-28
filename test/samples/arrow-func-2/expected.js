function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  return () => {
    console.log($_args[0]); // should print 'baz' not 'bar'
  };
}
foobar('baz')();
