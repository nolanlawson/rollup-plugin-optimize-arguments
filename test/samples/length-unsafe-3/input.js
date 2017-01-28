function foobar() {
  var len = arguments.length;
  return SOME_GLOBAL_CONDITION ? len : arguments;
}

export default foobar;
