function foobar() {
  return () => {
    console.log(arguments[0]); // should print 'baz' not 'bar'
  };
}
foobar('baz')();
