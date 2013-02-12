define([], function () {

  var currentTranslations = {}
    , translateFunction = function (translation) {
      var parts = translation.split(".")
        , i = 0
        , len = parts.length
        , translationScope = currentTranslations;

      for (; i < len; i += 1) {
        translationScope = translationScope[parts[i]];
      }

      return translationScope;
    };

  /**
   *
   */
  translateFunction.init = function (translations) {
    currentTranslations = translations;
  };

  return translateFunction;
});
