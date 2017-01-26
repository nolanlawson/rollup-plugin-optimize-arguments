function foobar() {
  (() => {
    console.log(arguments[0]); // should print 'baz' not 'bar'
  })('bar');
}
foobar('baz');
