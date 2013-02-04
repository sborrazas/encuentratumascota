define(["jquery", "app/flash_display", "bootstrap", "jquery_tmpl"], function ($, flash) {

  /**
   *
   */
  var PublicationDetail = function (ajaxSignup) {
    this.config = { ajaxSignup: ajaxSignup };
    this.publicationDetailTemplate = $("#publication-detail-template").template();
    this.$el = $("#publication-detail-container");
    this.$publicationInfo = this.$el.find(".publication-detail-info");
    this.$contactInfo = this.$el.find(".contact-info");

    this.$el.find("button.btn-success").click(function (event) {
      event.preventDefault();
      if (this.loading) {
        return;
      }
      if (!this.config.ajaxSignup.userSignedIn) {
        ajaxSignup.signIn();
        return;
      }
      this.loading = true;
      $.ajax({
        url: "/publications/" + this.currentPublicationId,
        dataType: "json",
        success: this.displayContactInfo.bind(this),
        error: function (jqXHR) {
          if (jqXHR.status === 401) { // Unauthorized
            this.config.ajaxSignup.signIn();
          }
          else {
            // TODO I18n
            flash.displayMessage("error", "Esta publicacion se ha eliminado.");
          }
          this.loading = false;
        }.bind(this)
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

    this.displayShareThis(publication);
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

  /**
   *
   */
  PublicationDetail.prototype.displayShareThis = function (publication) {
    var $shareThis = this.$publicationInfo
      , $twitter = $shareThis.find(".twitter")
      , $facebook = $shareThis.find(".facebook")
      , $email = $shareThis.find(".email")
      , options = {
        url: "http://encuentratumascota.org/#publication-" + publication.id, // TODO hardcoded :(
        title: publication.pet_name + " " + publication.publication_type,
        type: "hcount"
      };

    // Can't specify it on options ..
    $shareThis.find("span").attr("st_via", "etmuruguay");

    if (publication.attachments[0]) {
      options.image = publication.attachments[0];
    }

    stWidget.addEntry($.extend({
      service: "twitter",
      element: $twitter.get(0)
    }, options), { button: true });

    stWidget.addEntry($.extend({
      service: "facebook",
      element: $facebook.get(0)
    }, options));

    stWidget.addEntry($.extend({
      service: "email",
      element: $email.get(0)
    }, options));
  };

  return PublicationDetail;
});
