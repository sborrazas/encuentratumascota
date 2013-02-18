define(["jquery", "app/form_errors", "bootstrap"], function ($, formErrors, flash) {

  /**
   *
   */
  var EmailRequest = function (settings) {
    this.userSignedIn = settings.userSignedIn;
    this.userHasEmail = settings.userHasEmail;

    if (this.userSignedIn && !this.userHasEmail) {
      this.userId = settings.userId;
      $("#email-modal").modal("show");
    }

    this.bindFormSubmit();
  };

  /**
   *
   */
  EmailRequest.prototype.emailRequestSuccessfulAction = function (userData) {
    $("#username").html(userData.display);
    $("#email-modal").modal("hide");
  };

  /**
   *
   */
  EmailRequest.prototype.bindFormSubmit = function () {
    $("#update-email").submit(function (event) {
      var $form = $(event.target)
        , url = $form.attr("action")
        , params = $form.serialize();

      event.preventDefault();

      $.ajax({
        type: "PUT",
        url: url,
        data: params,
        dataType: "json",
        success: function (userData) {
          this.emailRequestSuccessfulAction(userData);
        }.bind(this),
        error: function (jqXHR) {
          var errors = $.parseJSON(jqXHR.responseText).errors;
          formErrors.display({
            form: $form,
            errors: errors,
            namespace: "user"
          });
        }
      });
    }.bind(this));
  };

  return EmailRequest;
});
