function foobar() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  {
    console.log(arguments)
  }
  return arguments;
}
foobar()