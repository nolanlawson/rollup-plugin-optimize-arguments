function foobar() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  if (whatever) {
    console.log(arguments)
  } else {
    console.log(arguments.length)
  }
  return arguments;
}
foobar()