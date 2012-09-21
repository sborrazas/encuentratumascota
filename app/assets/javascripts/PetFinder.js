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

    $.ajax({
      url:  "visit_add/",
      cache: false,
      type: "POST",
      data: { lat: lat, lng: lng },
      dataType: "json",
      success: function (response) {
        console.log(response);
      }
    });
  };

  PetFinder.prototype.populateMarkers = function() {
    var pins = [{
      lat: -34.90774,
      lng: -56.17355
    }, {
      lat: -34.91170,
      lng: -56.16460
    }, {
      lat: -34.90600,
      lng: -56.16190
    }, {
      lat: -34.92600,
      lng: -56.16590
    }, {
      lat: -34.90600,
      lng: -56.16391
    }, {
      lat: -34.90600,
      lng: -56.16392
    }, {
      lat: -34.914543,
      lng: -56.167560
    }], i;

    for (i = 0; i < pins.length; i++) {
      this.map.addMarker({
        lat: pins[i].lat,
        lng: pins[i].lng,
        icon: i % 3 === 0 ? this.imageLost : this.imageFound,
        infoWindow: {
          content: '<p>HTML Content</p>'
        }
      });
    }
  };

  PetFinder.prototype.addPins = function (pins) {
    var i, pin;

    for (i = 0; i < pins.length; i++) {
      pin = pins[i];

      this.map.addMarker({
        lat: pin.lat,
        lng: pin.lng,
        icon: i % 3 === 0 ? this.imageLost : this.imageFound,
        infoWindow: {
          content: '<h4>' + pin.name + '</h4><p>' + pin.description + '</p>'
        }
      });
    }
  };

  return PetFinder;

});
