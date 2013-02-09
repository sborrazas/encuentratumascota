define([], function () {

  var currentTranslations = {}
    , translateFunction = function (translation) {
      return currentTranslations[translation];
    };

  /**
   *
   */
  translateFunction.init = function (translations) {
    currentTranslations = translations;
  };

  return translateFunction;
});
