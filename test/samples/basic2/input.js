function foobar() {
  console.log(arguments[arguments.length - 1]);
  return arguments;
}
foobar();