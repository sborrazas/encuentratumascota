define(['jquery', 'PetFinder', 'app/main/ajax_signup', 'app/main/publication_handler'],
  function ($,    PetFinder,   AjaxSignUp,             PublicationHandler) {

  var petFinder, ajaxSignup, publicationHandler
    , config = {};

  return {
    init: function (settings) {
      config = settings;

      // Ajax signup
      ajaxSignup = new AjaxSignUp({
        userSignedIn: config.userSignedIn,
        successCallback: function () {
        }
      });

      // Publishing handler
      publicationHandler = new PublicationHandler({

      });

      // PetFinder
      petFinder = new PetFinder();
      petFinder.initMap();
      petFinder.displayPublications(config.publications);
    }
  };
});
