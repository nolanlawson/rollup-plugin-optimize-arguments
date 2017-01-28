function foobar() {
  var args = arguments;
  return function () {
    return args.length;
  }
}

export default foobar;
