define(["jquery", "bootstrap", "lib/gmaps"], function ($, bootstrap, GMaps) {

  /**
   *
   */
  var PublicationHandler = function () {
    this.map = new GMaps({
      div: "#main-panel",
      lat: -34.90649,
      lng: -56.16348,
      zoom: 14,
      click: function (event) {
        this.addMarkerNewPublication({
          lat: event.latLng.Ya,
          lng: event.latLng.Za
        });
      }.bind(this)
    });

    this.images = {
      lost: 'assets/lost.png',
      found: 'assets/found.png',
      adoption: 'assets/adoption.png',
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
      }.bind(this)
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
      this.displayPublication(publication);
    });
  };

  /**
   *
   */
  PublicationHandler.prototype.displayPublication = function (publication) {
    this.map.addMarker({
      lat: publication.lat,
      lng: publication.lng,
      icon: this.images[publication.status],
      infoWindow: {
        content: '<h4>' + publication.name + '</h4><p>' + publication.description + '</p>'
      }
    });
  };

  /**
   *
   */
  PublicationHandler.prototype.addMarkerNewPublication = function (location) {
    if (this.currentMarker) {
      this.currentMarker.setVisible(false);
    }
    this.currentMarker = this.map.addMarker({
      lat: location.lat,
      lng: location.lng,
      title: 'My Title',
      icon: this.images.lost,
      animation: 'drop',
      draggable: true,
      infoWindow: {
        content: '<strong>My Content</strong>'
      },
      dragend: function (event) {
        console.log(event);
      }
    });
  };

  /**
   *
   */
  PublicationHandler.prototype.placedCoords = function () {
    if (this.currentMarker) {
      return {
        lat: this.currentMarker.position.Ya,
        lng: this.currentMarker.position.Za
      };
    }
  };

  return PublicationHandler;
});
