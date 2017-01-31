var on;

on = function (element, eventName, listener) {
  element.addEventListener(eventName, listener, false);

  return {
    remove: function () {
      on.removeHandler(element, eventName, listener);
    }
  };
};

on.removeHandler = function (element, eventName, listener) {
  element.removeEventListener(eventName, listener);
};

module.exports = on;
