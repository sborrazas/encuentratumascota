define(["jquery", "app/form_errors", "app/flash_display", "bootstrap"], function ($, formErrors, flashDisplay) {

  var config = {
    MAX_ATTACHMENTS: 4
  };

  /**
   *
   */
  var PublicationForm = function (options) {
    this.$form = $("#publication-form");
    this.bindEvents();
    this.publicationHandler = options.handler;
    this.attachmentTemplate = $("#attachment-template").template();
    this.attachmentCount = 0;
  };

  /**
   *
   */
  PublicationForm.prototype.bindEvents = function () {
    // When clicking on 'New publication' button
    $("#publication-new").click(function (event) {
      event.preventDefault();
      if (!this.publicationHandler.isCoordsPlaced()) {
        // TODO I18n
        flashDisplay.displayMessage("info", "Click on the map");
      }
      this.showPublishForm();
      formErrors.clearErrors({ form: this.$form });
    }.bind(this));

    // When submitting publication
    this.$form.find("#publication-submit").click(function (event) {
      event.preventDefault();

      if (this.publicationHandler.isCoordsPlaced()) {
        this.createPublication();
      }
      else {
        flashDisplay.displayMessage("info", "You need to select the location where you lost the pet first");
      }
    }.bind(this));

    // When adding a new image
    this.$form.find("#image-upload-fields button").click(function (event) {
      event.preventDefault();
      this.addAttachmentField();
    }.bind(this));
  };

  /**
   *
   */
  PublicationForm.prototype.showPublishForm = function () {
    $("#new-publication-container").show();
    $("#publication-list").hide();

    // Display image upload attachment field if none is visible
    if (this.$form.find("#image-upload-fields input").length === 0) {
      this.addAttachmentField();
    }
  };

  /**
   *
   */
  PublicationForm.prototype.addAttachmentField = function () {
    var container
      , content;

    if (this.attachmentCount < config.MAX_ATTACHMENTS) {
      container = this.$form.find("#image-upload-fields ul");
      content = $.tmpl(this.attachmentTemplate, {
        id: "attachment-" + this.attachmentCount,
        name: "attachments[" + this.attachmentCount + "]"
      });

      this.attachmentCount += 1;
      container.append(content);
    }

    if (this.attachmentCount >= config.MAX_ATTACHMENTS) {
      // Hide 'Add attachment' button
      this.$form.find("#image-upload-fields button").hide();
    }
  };

  /**
   *
   */
  PublicationForm.prototype.createPublication = function () {
    var publicationData = new FormData(this.$form.get(0))
      , currentCoords = this.publicationHandler.placedCoords();

    publicationData.append("lat", currentCoords.lat);
    publicationData.append("lng", currentCoords.lng);

    $.ajax({
      url: "publications",
      type: "POST",
      data: publicationData,
      processData: false,
      contentType: false,
      success: this.successfulPublication.bind(this),
      error: this.errorPublication.bind(this)
    });
  };

  /**
   *
   */
  PublicationForm.prototype.successfulPublication = function (publication) {
    this.publicationHandler.displayPublication(publication);
    this.publicationHandler.clearPlacedMarker();
    this.$form.find("#image-upload-fields input").remove(); // Clear images
    this.$form.find("input, textarea").val(""); // Clear fields
    this.attachmentCount = 0; // Reset attachmentCount
    // Display 'Add Attachment' button (in case it was hidden)
    this.$form.find("#image-upload-fields button").show();
  };

  /**
   *
   */
  PublicationForm.prototype.errorPublication = function (jqXHR) {
    var errors = $.parseJSON(jqXHR.responseText).errors;
    formErrors.display({
      form: this.$form,
      errors: errors,
      namespace: "publication"
    });
  };

  return PublicationForm;

});
