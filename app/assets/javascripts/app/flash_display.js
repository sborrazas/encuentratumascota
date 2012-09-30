define(['jquery', 'bootstrap'], function ($) {

  var MESSAGE_TYPES = ['success', 'info', 'error'];

  var FlashDisplay = function (flashMessages) {
    MESSAGE_TYPES.forEach(function (messageType) {
      if (flashMessages[messageType]) {
        this.displayMessage(messageType, flashMessages[messageType]);
      }
    }.bind(this));
  };

  FlashDisplay.prototype.displayMessage = function (type, message) {
    $('<div class="message ' + type + '">' + message + '</div>').appendTo('body').alert();
  };

  return FlashDisplay;

});
