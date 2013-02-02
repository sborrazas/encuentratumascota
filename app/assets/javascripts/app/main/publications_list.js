define(["jquery", "bootstrap", "jquery_tmpl"], function ($) {

  /**
   *
   */
  var PublicationsList = function (settings) {
    // Publications list view setup
    this.$el = $("#publication-list");
    this.$publicationList = this.$el.children("ul");
    this.publicationListTemplate = $("#publication-list-template").template();
  };

  /**
   *
   */
  PublicationsList.prototype.displayPublications = function (publications) {
    // Clear publications list
    this.$publicationList.empty();

    if (publications.length > 0) {
      // Filter publications and display valid ones
      publications.forEach(function (publication) {
        this.displayPublicationOnSidebar({
          id: publication.id,
          publication_type: publication.publication_type,
          pet_name: publication.pet_name,
          description: publication.description,
          lost_on: publication.lost_on,
          breed: publication.breed,
          attachment: publication.attachments[0] || "/assets/default_dog.png"
        });
      }.bind(this));
      this.$el.find(".empty-state").hide();
    }
    else { // Empty message
      this.$el.find(".empty-state").show();
    }
  };

  /**
   *
   */
  PublicationsList.prototype.displayPublicationOnSidebar = function (publication) {
    var content = $.tmpl(this.publicationListTemplate, { publication: publication })
      , $content = $(content);

    this.$publicationList.append($content);

    $("body").addClass("with-sidebar");
  };

  return PublicationsList;
});