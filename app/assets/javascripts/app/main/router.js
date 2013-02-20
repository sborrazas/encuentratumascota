define(["app/translations"], function (t) {

  /**
   *
   */
  var Router = function () {
    this.callbacks = [];

    // Bind state change
    window.onpopstate = function (event) {
      this.urlChanged(document.location.pathname);
    }.bind(this);
  };

  /**
   *
   */
  Router.prototype.start = function (settings) {
    this.blankUrl = settings.blankUrl;
    if (document.location.pathname !== '') {
      this.urlChanged(document.location.pathname);
    }
    else {
      this.urlChanged(this.blankUrl);
    }
  };

  /**
   *
   */
  Router.prototype.registerRoute = function (regex, callback) {
    this.callbacks.push({ regex: regex, callback: callback });
  };

  /**
   *
   */
  Router.prototype.pushState = function (type, data) {
    var stateData = {}
      , title, url;

    switch (type) {
      case "filter": // data = publicationType
        stateData = data;
        title = data; // TODO
        url = "/s/" + data;
        break;
      case "detail": // data = publication
        stateData = data.slug;
        title = data.pet_name + ' [' + t(data.publication_type).toUpperCase() + ']';
        url = "/p/" + data.slug;
        break;
      case "new": // data = null
        title = t("publication_detail.deleted");
        url = "/p/new";
        break;
    }

    document.title = title;
    history.pushState(stateData, title, url);
    this.urlChanged(url);
  };

  /**
   *
   */
  Router.prototype.urlChanged = function (url) {
    var regexMatch;
    this.callbacks.forEach(function (callbackData) {
      if (regexMatch = url.match(callbackData.regex)) {
        callbackData.callback.apply(null, regexMatch.slice(1));
        return;
      }
    });
  };

  return new Router(); // Single instance
});
