function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/smalltalk" instead of "highlight.js/lib/languages/smalltalk.js"'
      );
    }
  }
  emitWarning();
    import lang from './smalltalk.js';
    export default lang;