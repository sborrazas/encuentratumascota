define(["jquery", "app/flash_display", "bootstrap", "jquery_tmpl"], function ($, flash) {

  /**
   *
   */
  var PublicationDetail = function () {
    this.publicationDetailTemplate = $("#publication-detail-template").template();
    this.$el = $("#publication-detail-container");
    this.$publicationInfo = this.$el.find(".publication-detail-info");
    this.$contactInfo = this.$el.find(".contact-info");

    this.$el.find("button.btn-success").click(function (event) {
      event.preventDefault();
      if (this.loading) {
        return;
      }
      this.loading = true;
      $.ajax({
        url: "/publications/" + this.currentPublicationId,
        dataType: "json",
        success: this.displayContactInfo.bind(this),
        error: function (jqXHR) {
          if (jqXHR.status === 401) { // Unauthorized
            // TODO I18n
            flash.displayMessage("error", "Debes estar logueado para acceder a la informacion de contacto.");
          }
          else {
            // TODO I18n
            flash.displayMessage("error", "Esta publicacion se ha eliminado.");
          }
          this.loading = false;
        }
      });
    }.bind(this));
  };

  /**
   *
   */
  PublicationDetail.prototype.showPublication = function (publication) {
    var $publicationInfo = this.$publicationInfo
      , content = $.tmpl(this.publicationDetailTemplate, { publication: publication });

    this.currentPublicationId = publication.id;

    this.$el.find("button.btn-success").show();
    this.$contactInfo.hide();

    $publicationInfo.empty();
    $publicationInfo.append(content);
  };

  /**
   *
   */
  PublicationDetail.prototype.displayContactInfo = function (publicationData) {
    this.$contactInfo.find(".content").html(publicationData.contact);
    this.$contactInfo.fadeIn(400);
    this.$el.find("button.btn-success").fadeOut(400);
    this.loading = false;
  };

  return PublicationDetail;
});
