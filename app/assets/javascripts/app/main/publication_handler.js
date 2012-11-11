define(["jquery", "bootstrap", "lib/gmaps"], function ($, bootstrap, GMaps) {

  /**
   *
   */
  var PublicationHandler = function () {
    this.map = new GMaps({
      div: "#main-panel",
      lat: -34.90649,
      lng: -56.16348,
      zoom: 14
    });

    this.images = {
      lost: 'assets/lost.png',
      found: 'assets/found.png',
      other: 'assets/other.png',
      home: 'assets/home.png'
    };
  };

  /**
   *
   */
  PublicationHandler.prototype.geoLocate = function () {
    GMaps.geolocate({
      success: function (position) {
        this.setHome(position.coords.latitude, position.coords.longitude);
      }.bind(this),
      error: function (error) {
        alert("Geolocation failed: " + error.message);
      },
      not_supported: function () {
        alert("Your browser does not support geolocation");
      },
      always: function() {}
    });
  };

  /**
   *
   */
  PublicationHandler.prototype.setHome = function (lat, lng) {
    this.map.setCenter(lat, lng);
    this.map.addMarker({
      lat: lat,
      lng: lng,
      icon: this.images.home
    });
  };

  /**
   *
   */
  PublicationHandler.prototype.displayPublications = function (publications) {
    publications.forEach(function (publication) {
      this.map.addMarker({
        lat: publication.lat,
        lng: publication.lng,
        icon: i % 3 === 0 ? this.imageLost : this.imageFound,
        infoWindow: {
          content: '<h4>' + publication.name + '</h4><p>' + publication.description + '</p>'
        }
      });
    }.bind(this));
  };

  /**
   *
   */
  PublicationHandler.prototype.addMarkerNewPublication = function () {
    this.map.addMarker({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng(),
      icon: this.imageFound,
      draggable: true,
      animation: 'drop',
      dragend: function () {
        var publication = new PublicationHandler();
        publication.showPublishForm();
      }
    });
  };

  return PublicationHandler;
});
