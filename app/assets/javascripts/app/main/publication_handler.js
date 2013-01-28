define(["jquery", "bootstrap", "lib/gmaps", "jquery_tmpl"], function ($, bootstrap, GMaps) {

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
    this.publicationListTemplate = $('#publication-list-template').template();
    this.publicationDetailTemplate = $('#publication-detail-template').template();

    // Publications list view setup
    this.$publicationList = $('#publication-list');

    // Using 'all' as default filter
    $('#main-sidebar .sidebar-options button').first().addClass('active');
    this.displayPublications({ publication_type: 'all' });

    // When clickin on a new publication reset filters
    $("#publication-new").click(function (event) {
      event.preventDefault();

      $('#main-sidebar .sidebar-options button').removeClass('active');
      this.displayPublications({ publication_type: 'all' });
    }.bind(this));

    // Bind click event to refresh publications
    $('#main-sidebar .sidebar-options button').click(function (event) {
      var clickedElement = $(event.target);

      event.preventDefault();

      // Marks selected element as 'active'
      $('#main-sidebar .sidebar-options button').removeClass('active');
      clickedElement.addClass('active');

      // Hide publications form and display publications list
      $('#new-publication-container').hide();
      this.$publicationList.show();

      this.displayPublications({ publication_type: clickedElement.data('publication-type') });
    }.bind(this));

    // Bind click to publication 'go back' detail button
    $("#publication-detail-container .go-back").click(function (event) {
      event.preventDefault();

      // Hide sidebar items and display publication list
      $("#main-sidebar .sidebar-item").hide();
      $("#publication-list").show();
    });
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
  PublicationHandler.prototype.displayPublications = function (filters) {
    var publicationType = filters.publication_type;

    // Hide sidebar items and display publication list
    $("#main-sidebar .sidebar-item").hide();
    $("#publication-list").show();

    // Remove previous markers
    this.map.removeMarkers();

    // Clear publications list
    this.$publicationList.empty();

    // Filter publications and display valid ones
    this.publications.forEach(function (publication) {
      if (publicationType === 'all' || publicationType === publication.publication_type) {
        this.displayPublicationOnMap(publication);
        this.displayPublicationOnSidebar({
          publication_type: publication.publication_type,
          pet_name: publication.pet_name,
          description: publication.description,
          lost_on: publication.lost_on,
          breed: publication.breed,
          attachment: publication.attachments[0] || '/assets/default_dog.png'
        });
      }
    }.bind(this));
  };

  /**
   *
   */
  PublicationHandler.prototype.displayPublicationOnMap = function (publication) {
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
  PublicationHandler.prototype.displayPublicationOnSidebar = function (publication) {
    var content = $.tmpl(this.publicationListTemplate, { publication: publication })
      , $content = $(content);

    $content.click(function (event) {
      event.preventDefault();

      this.showPublicationDetail(publication);
    }.bind(this));

    this.$publicationList.append($content);

    $("body").addClass("with-sidebar");
  };

  /**
   *
   */
  PublicationHandler.prototype.showPublicationDetail = function (publication) {
    var publicationDetailContainer = $("#publication-detail-container")
      , publicationInfo = publicationDetailContainer.find('.publication-detail-info')
      , content = $.tmpl(this.publicationDetailTemplate, { publication: publication });

    $("#main-sidebar .sidebar-item").hide();

    publicationInfo.empty();
    publicationInfo.append(content);

    publicationDetailContainer.show();
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
      dragend: function (event) {
        console.log(event);
      }
    });
  };

  /**
   *
   */
  PublicationHandler.prototype.placedCoords = function () {
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
  PublicationHandler.prototype.isCoordsPlaced = function () {
    return !! this.currentMarker;
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
