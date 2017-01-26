function foobar() {
  // comment goes here !
  /* and another */
     /*
     * and hey here's another
     * comment
     * for you */
    // hope you enjoy my comments
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  return arguments;
}
foobar()