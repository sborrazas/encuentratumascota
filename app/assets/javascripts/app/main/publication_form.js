define(["jquery", "app/form_errors", "bootstrap"], function ($, formErrors, bootstrap) {

  var PublicationForm = function () {
    this.form = $("#publication-form");
    this.bindEvents();
  };

  /**
   *
   */
  PublicationForm.prototype.bindEvents = function () {
    $("#publication-new").click(function (event) {
      event.preventDefault();
      this.showPublishForm();
    }.bind(this));

    this.form.find("#publication-submit").click(function (event) {
      event.preventDefault();
      this.createPublication();
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
    var publicationParams = this.form.serialize();

    // TODO: append lat and lng to publicationParams

    $.ajax({
      url: "publications",
      type: "POST",
      data: publicationParams,
      dataType: "json",
      success: function (jqXHR) {
        console.log(jqXHR);
      },
      error: function (jqXHR) {
        var errors = $.parseJSON(jqXHR.responseText).errors;
        formErrors.display({
          form: this.form,
          errors: errors,
          namespace: 'publication'
        });
      }.bind(this)
    });
  };

  return PublicationForm;

});
