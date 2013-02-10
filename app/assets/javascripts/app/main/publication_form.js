define(["jquery", "app/form_errors", "app/flash_display", "app/translations", "bootstrap_datepicker"],
  function ($, formErrors, flash, t) {

  var config = {
    MAX_ATTACHMENTS: 4
  };

  /**
   *
   */
  var PublicationForm = function (settings) {
    this.$el = $("#new-publication-container");
    this.$form = $("#publication-form");

    // Datepicker
    this.$form.find(".datepicker input").datepicker({
      format: "dd/mm/yyyy"
    });

    this.map = settings.map;
    this.successCallback = settings.successCallback;

    this.bindEvents();
    this.attachmentTemplate = $("#attachment-template").template();
    this.attachmentCount = 0;
  };

  /**
   *
   */
  PublicationForm.prototype.activate = function () {
    this.active = true;
    this.map.active = true;

    if (!this.map.isCoordsPlaced()) {
      flash.displayMessage("info", t("publication_form.click_on_map"));
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
    this.map.active = false;
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
        flash.displayMessage("info", t("publication_form.select_location"));
      }
    }.bind(this));

    // When adding a new image
    // this.$form.find("#image-upload-fields button").click(function (event) {
    //   event.preventDefault();
    //   this.addAttachmentField();
    // }.bind(this));
  };

  /**
   *
   */
  PublicationForm.prototype.addAttachmentField = function () {
    var container
      , $content;

    if (this.attachmentCount < config.MAX_ATTACHMENTS) {
      container = this.$form.find("#image-upload-fields ul");
      content = $.tmpl(this.attachmentTemplate, {
        id: "attachment-" + this.attachmentCount,
        name: "publication[attachments][" + this.attachmentCount + "]"
      });
      $content = $(content);

      this.attachmentCount += 1;
      container.append($content);

      // Adding a new image (other temp approach)
      $content.find("input").change(function (event) {
        var $element = $(event.target);

        if ($element.val()) {
          this.addAttachmentField();
        }
      }.bind(this));
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

    publicationData.append("publication[lat]", currentCoords.lat);
    publicationData.append("publication[lng]", currentCoords.lng);

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
    this.map.clearPlacedMarker();
    this.map.displayPublication(publication);

    this.$form.find("#image-upload-fields input").remove(); // Clear images
    this.$form.find("input, textarea").val(""); // Clear fields
    this.attachmentCount = 0; // Reset attachmentCount
    // Display 'Add Attachment' button (in case it was hidden)
    this.$form.find("#image-upload-fields button").show();

    this.successCallback(publication);

    document.location.hash = "";

    flash.displayMessage("success", t("publication_form.publication_created_successfully"));
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
