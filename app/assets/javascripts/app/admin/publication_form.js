define(["jquery", "lib/gmaps", "bootstrap_datepicker"], function ($, GMaps) {

  var config = {
    MAX_ATTACHMENTS: 4
  };

  /**
   *
   */
  var PublicationForm = function () {
    this.$form = $("form.publication-form");

    // Datepicker
    this.$form.find(".datepicker input").datepicker({
      format: "dd/mm/yyyy"
    });

    // Form submit
    this.$form.submit(function (event) {
      var currentPosition = this.currentMarker.getPosition();

      $("#publication_lat").val(currentPosition.lat());
      $("#publication_lng").val(currentPosition.lng());
    }.bind(this));

    // Map
    this.map = new GMaps({
      div: "#map",
      lat: ($("#publication_lat").val() || -34.90649),
      lng: ($("#publication_lng").val() || -56.16348),
      zoom: 14,
      click: function (event) {
        var position = event.latLng;

        this.map.setCenter(position.lat(), position.lng());
        this.currentMarker.setPosition(position);
      }.bind(this)
    });

    this.images = {
      myPet: '/assets/my-pet-big.png'
    };

    this.currentMarker = this.map.addMarker({
      lat: ($("#publication_lat").val() || -34.90649),
      lng: ($("#publication_lng").val() || -56.16348),
      icon: this.images.myPet,
      animation: 'drop',
      draggable: true
    });
  };

  return PublicationForm;
});
