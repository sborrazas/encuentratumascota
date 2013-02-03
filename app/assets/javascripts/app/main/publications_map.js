define(["jquery", "lib/gmaps", "bootstrap", "jquery_tmpl"], function ($, GMaps) {

  /**
   *
   */
  var PublicationsMap = function (settings) {
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
      other: 'assets/other.png', // TODO
      home: 'assets/home.png',
      highlighted: '/assets/found.png' // TODO
    };

    this.geoLocate();
  };

  /**
   *
   */
  PublicationsMap.prototype.geoLocate = function () {
    GMaps.geolocate({
      success: function (position) {
        this.map.addMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          icon: this.images.home
        });
      }.bind(this)
    });
  };

  /**
   *
   */
  PublicationsMap.prototype.displayPublications = function (publications) {
    this.map.removeMarkers();
    this.markers = {};
    publications.forEach(function (publication) {
      this.markers[publication.id] = this.map.addMarker({
        lat: publication.lat,
        lng: publication.lng,
        icon: this.images[publication.publication_type],
        click: function (event) {
          document.location.hash = 'publication-' + publication.id;
        }
      });
    }.bind(this));
  };

  /**
   *
   */
  PublicationsMap.prototype.addMarkerNewPublication = function (location) {
    if (this.currentMarker) {
      this.clearPlacedMarker();
    }
    this.currentMarker = this.map.addMarker({
      lat: location.lat,
      lng: location.lng,
      icon: this.images.lost, // TODO
      animation: 'drop',
      draggable: true
    });
  };

  /**
   *
   */
  PublicationsMap.prototype.placedCoords = function () {
    if (this.isCoordsPlaced()) {
      return {
        lat: this.currentMarker.position.Ya,
        lng: this.currentMarker.position.Za
      };
    }
  };

  /**
   *
   */
  PublicationsMap.prototype.isCoordsPlaced = function () {
    return !! this.currentMarker;
  };

  /**
   *
   */
  PublicationsMap.prototype.clearPlacedMarker = function () {
    if (!this.isCoordsPlaced()) {
      return;
    }
    this.currentMarker.setVisible(false); // FIXME Couldn't find a way to remove it :(
    this.currentMarker = null;
  };

  /**
   *
   */
  PublicationsMap.prototype.highlightPublication = function (publication) {
    var marker = this.markers[publication.id]
      , position = marker.getPosition();

    marker.setIcon(this.images.highlighted);
    this.map.setCenter(position.Ya, position.Za);
  };

  return PublicationsMap;
});
