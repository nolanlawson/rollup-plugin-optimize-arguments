function foobar(){var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }for(var o=0;o<arguments.length;o++)console.log(arguments[o]);return $_args}foobar();
