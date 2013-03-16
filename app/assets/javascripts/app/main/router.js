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
    if (document.location.pathname !== '/') {
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
        title = t("filters." + data);
        url = "/s/" + data;
        break;
      case "detail": // data = publication
        stateData = data.slug;
        title = data.pet_name + ' [' + t(data.publication_type).toUpperCase() + ']';
        url = "/p/" + data.slug;
        break;
      case "new": // data = null
        title = t("new_publication");
        url = "/p/new";
        break;
    }

    if (title.length > 0) {
      title += " - Encuentra Tu Mascota";
    }
    else {
      title = "Encuentra Tu Mascota";
    }
    if (history && history.pushState) {
      history.pushState(stateData, title, url);
      document.title = title;
      this.urlChanged(url);
    }
    else {
      document.location.href = url;
    }
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
