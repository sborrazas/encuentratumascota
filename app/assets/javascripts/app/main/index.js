define(['jquery', 'PetFinder', 'app/main/ajax_signup', 'app/main/publication_handler', 'app/flash_display'],
  function ($,    PetFinder,   AjaxSignUp,             PublicationHandler,              FlashDisplay) {

  var petFinder, ajaxSignup, publicationHandler
    , config = {};

  return {
    init: function (settings) {
      config = settings;

      // Flash messages
      flash = new FlashDisplay(config.flash);

      // Ajax signup
      ajaxSignup = new AjaxSignUp({
        userSignedIn: config.userSignedIn,
        successCallback: function () {
          flash.displayMessage('success', 'Logueado correctamente!');
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
