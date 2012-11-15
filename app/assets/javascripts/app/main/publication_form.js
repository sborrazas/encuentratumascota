define(["jquery", "app/form_errors", "app/flash_display", "bootstrap"], function ($, formErrors, flashDisplay) {

  var PublicationForm = function (options) {
    this.form = $("#publication-form");
    this.bindEvents();
    this.publicationHandler = options.handler;
  };

  /**
   *
   */
  PublicationForm.prototype.bindEvents = function () {
    $("#publication-new").click(function (event) {
      event.preventDefault();
      if (this.publicationHandler.placedCoords()) {
        this.showPublishForm();
      }
      else {
        // TODO I18n
        flashDisplay.displayMessage('info', 'Click on the map');
      }
    }.bind(this));

    this.form.find("#publication-submit").click(function (event) {
      event.preventDefault();
      this.createPublication();
    }.bind(this));

    $("#publication-modal").on("show", function () {
      formErrors.clearErrors({ form: this.form });
    }.bind(this));
  };

  /**
   *
   */
  PublicationForm.prototype.showPublishForm = function () {
    $("#publication-modal").modal("show").show(300);
  };

  /**
   *
   */
  PublicationForm.prototype.createPublication = function () {
    var publicationParams = this.form.serialize()
      , currentCoords = this.publicationHandler.placedCoords()
      , markerParams = $.param({ publication: currentCoords });

    $.ajax({
      url: "publications",
      type: "POST",
      data: [publicationParams, markerParams].join("&"),
      dataType: "json",
      success: this.successfulPublication.bind(this),
      error: this.errorPublication.bind(this)
    });
  };

  /**
   *
   */
  PublicationForm.prototype.successfulPublication = function (publication) {
    var publicationModal = $("#publication-modal");

    this.publicationHandler.displayPublication(publication);
    this.publicationHandler.clearPlacedMarker();
    publicationModal.modal("hide").hide(300);
    publicationModal.find('input, textarea').val(''); // Clear fields
  };

  /**
   *
   */
  PublicationForm.prototype.errorPublication = function (jqXHR) {
    var errors = $.parseJSON(jqXHR.responseText).errors;
    formErrors.display({
      form: this.form,
      errors: errors,
      namespace: 'publication'
    });
  };

  return PublicationForm;

});
