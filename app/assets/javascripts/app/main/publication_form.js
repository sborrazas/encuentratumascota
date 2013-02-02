define(["jquery", "app/form_errors", "app/flash_display", "bootstrap"], function ($, formErrors, flash) {

  var config = {
    MAX_ATTACHMENTS: 4
  };

  /**
   *
   */
  var PublicationForm = function (settings) {
    this.$el = $("#new-publication-container");
    this.$form = $("#publication-form");

    this.map = settings.map;

    this.bindEvents();
    this.attachmentTemplate = $("#attachment-template").template();
    this.attachmentCount = 0;
  };

  /**
   *
   */
  PublicationForm.prototype.activate = function () {
    this.active = true;

    if (!this.map.isCoordsPlaced()) {
      // TODO I18n
      flash.displayMessage("info", "Click on the map");
    }
    // Display image upload attachment field if none is visible
    if (this.$form.find("#image-upload-fields input").length === 0) {
      this.addAttachmentField();
    }

    formErrors.clearErrors({ form: this.$form });
  };

  /**
   *
   */
  PublicationForm.prototype.deactivate = function () {
    this.map.clearPlacedMarker();
    flash.clearMessages();
    this.active = false;
  }

  /**
   *
   */
  PublicationForm.prototype.bindEvents = function () {
    // When submitting publication
    this.$form.find("#publication-submit").click(function (event) {
      event.preventDefault();

      if (this.map.isCoordsPlaced()) {
        this.createPublication();
      }
      else {
        flash.displayMessage("info", "You need to select the location where you lost the pet first.");
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
      , currentCoords = this.map.placedCoords();

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
    this.map.displayPublication(publication);
    this.map.clearPlacedMarker();
    this.$form.find("#image-upload-fields input").remove(); // Clear images
    this.$form.find("input, textarea").val(""); // Clear fields
    this.attachmentCount = 0; // Reset attachmentCount
    // Display 'Add Attachment' button (in case it was hidden)
    this.$form.find("#image-upload-fields button").show();

    document.location.hash = "";
    // TODO I18n
    flash.displayMessage("success", "Publication created successfully!");
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
