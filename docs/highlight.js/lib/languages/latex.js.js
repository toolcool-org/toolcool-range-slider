function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/latex" instead of "highlight.js/lib/languages/latex.js"'
      );
    }
  }
  emitWarning();
    module.exports = require('./latex.js');