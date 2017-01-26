function foobar() {
  /* comment goes here ! */
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  return arguments;
}
foobar()