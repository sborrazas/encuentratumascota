define(['jquery', 'app/main/ajax_signup', 'app/main/publication_handler', 'app/flash_display', 'app/main/publication_form'],
  function ($,    AjaxSignUp,             PublicationHandler,             FlashDisplay,        PublicationForm) {

  var config = {}
    , petFinder, ajaxSignup, publicationHandler, publicationForm;

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
          $('#logged-out-nav').hide();
        }
      });

      if (config.userSignedIn) { // Hiding sign in/up buttons if user's already logged in
        $('#logged-out-nav').hide();
      }

      // Publications & GMaps handler
      publicationHandler = new PublicationHandler({

      });

      // Publications form handler
      publicationForm = new PublicationForm({

      });
    }
  };
});
