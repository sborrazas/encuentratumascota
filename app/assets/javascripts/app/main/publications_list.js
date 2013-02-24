define(["jquery", "app/translations", "app/main/router", "bootstrap", "jquery_tmpl"],
  function ($, t, router) {

  var IMG_LIST_SIZE = 90;

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
      router.pushState("detail", this.publicationsBySlug[$li.data("publication-slug")]);
    }.bind(this);
  };

  /**
   *
   */
  PublicationsList.prototype.displayPublications = function (publications) {
    // Clear publications list
    this.$publicationList.empty();
    this.publicationsBySlug = {};

    if (publications.length > 0) {
      // Filter publications and display valid ones
      publications.forEach(function (publication) {
        this.publicationsBySlug[publication.slug] = publication;
        this.displayPublicationOnSidebar({
          slug: publication.slug,
          publication_type: publication.publication_type,
          publication_type_str: t(publication.publication_type),
          pet_name: publication.pet_name,
          description: publication.description,
          short_description: publication.short_description,
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
      , $content = $(content)
      , $img = $content.find("img");

    this.$publicationList.append($content);

    $img.load(function (event) {
      var spaceLeft, spaceTop;

      if ($img.width() < $img.height()) {
        $img.width(IMG_LIST_SIZE);
      }
      else {
        $img.height(IMG_LIST_SIZE);
      }

      spaceLeft = (-1) * ($img.width() - IMG_LIST_SIZE) / 2;
      spaceTop = (-1) * ($img.height() - IMG_LIST_SIZE) / 2;

      $img.css("top", spaceTop + "px");
      $img.css("left", spaceLeft + "px");
    });

    if ($img.get(0).complete && $img.get(0).naturalHeight > 0) {
      $img.trigger("load");
    }

    $content.click(this.publicationClicked);
  };

  return PublicationsList;
});
