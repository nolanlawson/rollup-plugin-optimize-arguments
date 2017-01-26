function foobar() {
  console.log(arguments);
  (function () {
    console.log(arguments);
  })();
  console.log(arguments);
}
foobar();
