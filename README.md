rollup-plugin-optimize-arguments [![Build Status](https://travis-ci.org/nolanlawson/rollup-plugin-optimize-arguments.svg?branch=master)](https://travis-ci.org/nolanlawson/rollup-plugin-optimize-arguments)
=====

Rollup plugin to analyze for usage of `arguments` and automatically convert it to an array, to avoid leaking the `arguments` object (which is an [optimization killer](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments)).

Basically, you can just use `arguments` as if it were a normal array and this plugin will take care of the rest.

## Installation

```bash
npm install --save-dev rollup-plugin-optimize-arguments
```

## Usage

```js
var rollup = require('rollup').rollup;
var optimizeArguments = require('rollup-plugin-optimize-arguments');

rollup({
  entry: 'main.js',
  plugins: [
    optimizeArguments()
  ]
}).then(...)
```

## Examples

Example input:

```js
function foobar() {
  console.log(arguments[arguments.length - 1]);
  return arguments;
}
```

Output:

```js
function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  console.log($_args[$_args.length - 1]);
  return $_args;
}
```

Or even nested:

```js
function foobar() {
  console.log(arguments);
  (function foobaz() {
    console.log(arguments);
    (() => {
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
```

Output:

```js
function foobar() {
  var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
  console.log($_args);
  (function foobaz() {
    var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
    console.log($_args);
    (() => {
      console.log($_args);
      var toto = function () {
        var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
        console.log($_args);
        !function() {
          var $_len = arguments.length, $_args = new Array($_len); while ($_len--) { $_args[$_len] = arguments[$_len]; }
          console.log($_args);
        }();
      };
      toto();
    })();
  })();
}
foobar();
```

(Arrow functions do not create their own scope and thus inherit their parent's `arguments`.)

## Credits

Thanks to Rich Harris for [rollup-plugin-inject](https://github.com/rollup/rollup-plugin-inject) and Alex Lur for [rollup-plugin-ignore](https://github.com/alexlur/rollup-plugin-ignore) which I based this codebase off of.