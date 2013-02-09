define(["jquery", "app/form_errors", "app/flash_display", "app/translations", "bootstrap"],
  function ($, formErrors, flash, translations) {

  /**
   *
   */
  var AjaxSignup = function (settings) {
    this.userSignedIn = settings.userSignedIn;

    if (this.userSignedIn) {
      $('#logged-out-nav').hide();
      $('#logged-in-nav').show();
    }
    else {
      $('#logged-out-nav').show();
      $('#logged-in-nav').hide();
    }

    // Sign in/up links event binding
    $('.btn-sign-in').live('click', function (event) {
      event.preventDefault();
      if (!this.userSignedIn) {
        this.signIn();
      }
    }.bind(this));

    $('.btn-sign-up').live('click', function (event) {
      event.preventDefault();
      if (!this.userSignedIn) {
        this.signUp();
      }
    }.bind(this));

    this.bindFormSubmit();
  };

  /**
   *
   */
  AjaxSignup.prototype.loginSuccessfulAction = function (userData) {
    var userImage = userData.image_url.length > 0 ? userData.image_url : "/assets/default_user.png"

    $("#modal-sign-in").modal("hide");
    $("#modal-sign-up").modal("hide");

    flash.displayMessage("success", t("ajax_signup.logged_in_successfully"));
    $("#logged-out-nav").hide();
    $("#logged-in-nav").show();
    $("#username").html(userData.display);

    $("#user-image").html("<img src=\"" + userImage + "\" alt=\"" + userData.display + "\" />");
  };

  /**
   *
   */
  AjaxSignup.prototype.bindFormSubmit = function () {
    $('#new_user, #user_new').submit(function (event) {
      var $form = $(event.target)
        , url = $form.attr('action')
        , params = $form.serialize();

      event.preventDefault();

      $.ajax({
        type: "POST",
        url: url,
        data: params,
        dataType: 'json',
        success: function (content) {
          this.loginSuccessfulAction(content);
        }.bind(this),
        error: function (jqXHR) {
          var errors = $.parseJSON(jqXHR.responseText).errors;
          formErrors.display({
            form: $form,
            errors: errors,
            namespace: 'user'
          });
        }
      });
    }.bind(this));
  }

  /**
   *
   */
  AjaxSignup.prototype.signUp = function () {
    $('#modal-sign-in').modal('hide');
    $('#modal-sign-up').modal('show').show(300);
  };

  /**
   *
   */
  AjaxSignup.prototype.signIn = function () {
    $('#modal-sign-up').modal('hide');
    $('#modal-sign-in').modal('show').show(300);
  };

  return AjaxSignup;
});
