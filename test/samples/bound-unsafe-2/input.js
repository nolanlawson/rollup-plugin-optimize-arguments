function foobar() {
  var args = (someGlobalCondition ? arguments : void 0);
  return args;
}

export default foobar;
