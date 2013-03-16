(function () {

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
      var i = 0
        , len = this.length;

      for(; i < len; i++) {
        fn.call(scope, this[i], i, this);
      }
    }
  }

  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }

      var aArgs = Array.prototype.slice.call(arguments, 1)
        , fToBind = this
        , fNOP = function () {}
        , fBound = function () {
            var bindedThis = this instanceof fNOP && oThis ? this : oThis;

            return fToBind.apply(bindedThis, aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
      var i = start || 0
        , len = this.length;
      for (; i < len; i += 1) {
        if (this[i] == obj) {
          return i;
        }
      }
      return -1;
    }
  }

}());
