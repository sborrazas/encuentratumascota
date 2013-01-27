define(['jquery', 'app/main/ajax_signup', 'app/main/publication_handler', 'app/flash_display', 'app/main/publication_form'],
  function ($,    AjaxSignUp,             PublicationHandler,             flashDisplay,        PublicationForm) {

  var config = {}
    , petFinder, ajaxSignup, publicationHandler, publicationForm;

  return {
    init: function (settings) {
      config = settings;

      // Flash messages
      flashDisplay.displayMessages(config.flash);

      if (config.userSignedIn) {
        $('#logged-out-nav').hide();
        $('#logged-in-nav').show();
      }
      else {
        $('#logged-out-nav').show();
        $('#logged-in-nav').hide();
      }

      // Ajax signup
      ajaxSignup = new AjaxSignUp({
        userSignedIn: config.userSignedIn,
        successCallback: function (userData) {
          flash.displayMessage('success', 'Logueado correctamente!');
          $('#logged-out-nav').hide();
          $('#logged-in-nav').show();
          $('#username').html(userData.display);
        }
      });

      if (config.userSignedIn) { // Hiding sign in/up buttons if user's already logged in
        $('#logged-out-nav').hide();
      }

      // Publications & GMaps handler
      publicationHandler = new PublicationHandler({
        publications: settings.publications
      });

      // Publications form handler
      publicationForm = new PublicationForm({
        handler: publicationHandler
      });
    }
  };
});
