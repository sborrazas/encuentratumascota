define(["jquery", "bootstrap", "lib/gmaps"], function ($, bootstrap, GMaps) {

  /**
   *
   */
  var PublicationHandler = function (settings) {
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

    this.publications = settings.publications;
    // Checking 'Lost' as default label
    $('.sidebar-options #filter-lost').prop('checked', true);
    this.displayPublications();

    // Bind click event to refresh publications
    $('.sidebar-options input').change(this.displayPublications.bind(this));
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
  PublicationHandler.prototype.displayPublications = function () {
    var publicationTypes = [];

    // Grab filters
    $('.sidebar-options input:checked').each(function (index, element) {
      publicationTypes.push(element.value);
    });

    // Remove previous markers
    this.map.removeMarkers();

    // Filter publications and display valid ones
    this.publications.forEach(function (publication) {
      if (publicationTypes.indexOf(publication.publication_type) !== -1) {
        this.displayPublication(publication);
      }
    }.bind(this));
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
        content: '<h4>' + publication.pet_name + '</h4><p>' + publication.description + '</p>'
      }
    });
  };

  /**
   *
   */
  PublicationHandler.prototype.addMarkerNewPublication = function (location) {
    if (this.currentMarker) {
      this.clearPlacedMarker();
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

  /**
   *
   */
  PublicationHandler.prototype.clearPlacedMarker = function () {
    this.currentMarker.setVisible(false); // FIXME Couldn't find a way to remove it :(
    this.currentMarker = null;
  };

  return PublicationHandler;
});
