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
        if (this.active) {
          this.addMarkerNewPublication({
            lat: event.latLng.hb,
            lng: event.latLng.ib
          });
        }
      }.bind(this)
    });

    this.images = {
      lost: '/assets/lost-small.png',
      found: '/assets/found-small.png',
      adoption: '/assets/adoption-small.png',
      lost_big: '/assets/lost-big.png',
      found_big: '/assets/found-big.png',
      adoption_big: '/assets/adoption-big.png',
      myPet: '/assets/my-pet-big.png',
      home: '/assets/home.png'
    };

    this.geoLocate();
  };

  /**
   *
   */
  PublicationsMap.prototype.geoLocate = function () {
    GMaps.geolocate({
      success: function (position) {
        this.home = position.coords;
        this.displayHome();
      }.bind(this)
    });
  };

  /**
   *
   */
  PublicationsMap.prototype.displayHome = function () {
    this.map.addMarker({
      lat: this.home.latitude,
      lng: this.home.longitude,
      icon: this.images.home
    });
  };

  /**
   *
   */
  PublicationsMap.prototype.displayPublications = function (publications) {
    this.map.removeMarkers();
    this.highlightedPublication = null;
    this.markers = {};
    publications.forEach(this.displayPublication.bind(this));
    this.geoLocate();
  };

  /**
   *
   */
  PublicationsMap.prototype.displayPublication = function (publication) {
    this.markers[publication.id] = this.map.addMarker({
      lat: publication.lat,
      lng: publication.lng,
      icon: this.images[publication.publication_type],
      click: function (event) {
        document.location.hash = 'publication-' + publication.id;
      }
    });
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
      icon: this.images.myPet,
      animation: 'drop',
      draggable: true
    });
    this.map.setCenter(location.lat, location.lng);
  };

  /**
   *
   */
  PublicationsMap.prototype.placedCoords = function () {
    if (this.isCoordsPlaced()) {
      return {
        lat: this.currentMarker.position.hb,
        lng: this.currentMarker.position.ib
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
      , position = marker.getPosition()
      , highlighted = this.highlightedPublication;

    if (highlighted) {
      highlighted.marker.setIcon(this.images[highlighted.publication.publication_type]);
    }

    this.highlightedPublication = {
      marker: marker,
      publication: publication
    };

    marker.setIcon(this.images[publication.publication_type + '_big']);
    this.map.setCenter(position.hb, position.ib);
  };

  /**
   *
   */
  PublicationsMap.prototype.resize = function () {
    this.map.refresh();
  };

  return PublicationsMap;
});
