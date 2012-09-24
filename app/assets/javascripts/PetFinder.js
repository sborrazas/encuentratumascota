define(['jquery', 'lib/gmaps'], function ($, GMaps) {

  var PetFinder = function () {
    this.map = null;
    this.imageLost = 'lost.png';
    this.imageFound = 'found.png';
    this.imageAdoption = 'other.png';
  };

  PetFinder.prototype.initMap = function () {
    this.map = new GMaps({
      div: '#main-panel',
      lat: -34.90649,
      lng: -56.16348,
      zoom: 14,
    });

    var self = this;
    GMaps.geolocate({
      success: function (position) {
        self.setHome(position.coords.latitude, position.coords.longitude);
      },
      error: function (error) {
        alert('Geolocation failed: ' + error.message);
      },
      not_supported: function () {
        alert("Your browser does not support geolocation");
      },
      always: function() {}
    });
  };

  PetFinder.prototype.setHome = function (lat, lng) {
    this.map.setCenter(lat, lng);
    this.map.addMarker({
      lat: lat,
      lng: lng,
      icon: 'http://google-maps-icons.googlecode.com/files/home.png'
    });
  };

  PetFinder.prototype.displayPublications = function (publications) {
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

  return PetFinder;

});
