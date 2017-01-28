function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  var args = (someGlobalCondition ? $_args : void 0);
  return args;
}

export default foobar;
