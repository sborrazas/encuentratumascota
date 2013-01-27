define(['jquery', 'app/form_errors', 'bootstrap'], function ($, formErrors) {

  /**
   *
   */
  var AjaxSignup = function (settings) {
    this.successCallback = settings.successCallback;
    this.userSignedIn = settings.userSignedIn;

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
    $('#modal-sign-in').modal('hide');
    $('#modal-sign-up').modal('hide');

    if (typeof this.successCallback === 'function') {
      this.successCallback(userData);
    }
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
