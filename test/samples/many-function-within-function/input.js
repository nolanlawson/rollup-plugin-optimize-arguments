function foobar() {
  console.log(arguments);
  (function foobaz() {
    console.log(arguments);
    (function () {
      console.log(arguments);
      var toto = function () {
        console.log(arguments);
        !function() {
          console.log(arguments);
        }()
      }
      toto();
    })();
  })();
}
foobar();
