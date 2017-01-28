function foobar() {
  var len = arguments.length;
  return function () {
    return len;
  };
}

export default foobar;
