function foobar() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  console.log(arguments['length']);
}

export default foobar;
