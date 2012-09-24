define(['jquery', 'lib/gmaps'], function ($, GMaps) {

console.log('Petfinder module loaded!');

  var PetFinder = function () {
    this.map = null;
    this.imageLost = 'img/lost.png';
    this.imageFound = 'img/found.png';
    this.imageAdoption = 'img/other.png';

    this.initMap();
    this.geoLocate();
    this.bindEvents();

  };

  PetFinder.prototype.initMap = function () {
    this.map = new GMaps({
        div: '#main-panel',
        lat: -34.90649,
        lng: -56.16348,
        zoom: 14
    });

    this.populateMarkers();
  };

  PetFinder.prototype.geoLocate = function(){

    var self = this;

    GMaps.geolocate({
      success: function(position) {

          self.map.setCenter(position.coords.latitude, position.coords.longitude);

          self.map.addMarker({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              icon: 'http://google-maps-icons.googlecode.com/files/home.png'
          });

      },
      error: function(error) {

      },
      not_supported: function() {

      },
      always: function() {

      }
    });
  };

  PetFinder.prototype.populateMarkers = function(){

    //These should load from backend...
    var pins = [{lat: -34.90774,  lng: -56.17355},
                {lat: -34.91170,  lng: -56.16460},
                {lat: -34.90600,  lng: -56.16190},
                {lat: -34.92600,  lng: -56.16590},
                {lat: -34.90600,  lng: -56.16391},
                {lat: -34.90600,  lng: -56.16392},
                {lat: -34.914543, lng: -56.167560}];

    for (var i = 0; i < pins.length; i++) {

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

  //Binds common app events
  PetFinder.prototype.bindEvents = fuction = function(){

    //Avoid overlapping log-in/create-account modals.
    $('#modal-log-in').on('show', function () {
      $('#modal-create-account').modal('hide');
    });

    $('#modal-create-account').on('show', function () {
      $('#modal-log-in').modal('hide');
    });

  };



  return PetFinder;

});
