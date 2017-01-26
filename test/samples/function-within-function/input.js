function foobar() {
  (function () {
    console.log(arguments);
  })();
}
foobar();
