define(["jquery", "bootstrap"], function ($) {

  var MESSAGE_TYPES = ["success", "info", "error"];

  /**
   *
   */
  var FlashDisplay = function () {};

  /**
   *
   */
  FlashDisplay.prototype.displayMessages = function (messages) {
    MESSAGE_TYPES.forEach(function (messageType) {
      if (messages[messageType]) {
        this.displayMessage(messageType, messages[messageType]);
      }
    }.bind(this));
  };

  /**
   *
   */
  FlashDisplay.prototype.displayMessage = function (type, message) {
    $("<div class=\"alert alert-" + type + "\">" + message + "</div>").appendTo("#main-panel");
  };

  FlashDisplay.prototype.clearMessages = function () {
    $("#main-panel .alert").remove();
  };

  return new FlashDisplay();

});
