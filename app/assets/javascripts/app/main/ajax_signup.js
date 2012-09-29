define(['jquery', 'bootstrap'], function ($) {

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
        this.signUp();
      }
    }.bind(this));

    $('.btn-sign-up').live('click', function (event) {
      event.preventDefault();
      if (!this.userSignedIn) {
        this.signIn();
      }
    }.bind(this));
  };

  /**
   *
   */
  AjaxSignup.prototype.loginSuccessfulAction = function () {
    if (typeof this.successCallback === 'function') {
      this.successCallback();
    }
  };

  /**
   *
   */
  AjaxSignup.prototype.bindFormSubmit = function () {
    var userForm = $('#new_user, #user_new');

    userForm.submit(function (event) {
      var url, params;

      event.preventDefault();

      url = userForm.attr('action') + '.json';
      params = $(this).serialize();

      $.post(url, params, function (content) {
        if (content.status === 'error') {
          $('#cboxContent .messages').displayMessage('flash-error', content.errors);
        }
        else if (content.status === 'success') {
          this.loginSuccessfulAction();
        }
      }.bind(this));
    }.bind(this));
  }

  /**
   *
   */
  AjaxSignup.prototype.signUp = function () {
    $('#modal-sign-in').modal('show').show(300);
  };

  /**
   *
   */
  AjaxSignup.prototype.signIn = function () {
    $('#modal-sign-in').modal('show').show(300);
  };

  return AjaxSignup;
});
