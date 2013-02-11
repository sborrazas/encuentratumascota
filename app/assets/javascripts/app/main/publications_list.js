define(["jquery", "app/translations", "bootstrap", "jquery_tmpl"], function ($, t) {

  /**
   *
   */
  var PublicationsList = function (settings) {
    // Publications list view setup
    this.$el = $("#publication-list");
    this.$publicationList = this.$el.children("ul");
    this.publicationListTemplate = $("#publication-list-template").template();

    this.publicationClicked = function (event) {
      var $li = $(event.target).parents(".publication-item");

      document.location.hash = "#publication-" + $li.data('publication-id');
    }.bind(this);
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
          publication_type_str: t(publication.publication_type),
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

    $content.click(this.publicationClicked);

    $("body").addClass("with-sidebar");
  };

  return PublicationsList;
});
