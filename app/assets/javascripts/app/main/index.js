define(["jquery", "app/main/ajax_signup", "app/main/publications_map", "app/main/publications_list",
  "app/main/publication_detail", "app/main/publication_form", "app/flash_display"],
  function ($, AjaxSignUp, PublicationsMap, PublicationsList, PublicationDetail, PublicationForm, flash) {

  var config = {}
    , petFinder, ajaxSignup, publicationsList, publicationsMap, publicationDetail, publicationForm;

  return {
    init: function (settings) {
      config = settings;

      // Flash messages
      flash.displayMessages(config.flash);

      // Ajax signup
      ajaxSignup = new AjaxSignUp({
        userSignedIn: config.userSignedIn
      });

      // Publications & GMaps handler
      publicationsMap = new PublicationsMap();

      // Publications sidebar list
      publicationsList = new PublicationsList();

      // Publications form handler
      publicationForm = new PublicationForm({
        map: publicationsMap
      });

      // Publication detail
      publicationDetail = new PublicationDetail();

      publicationsMap.displayPublications(config.publications);
      $(window).bind("hashchange", this.hashChanged.bind(this));

      // Bind click event to refresh publications
      $("#main-sidebar .sidebar-options button").click(function (event) {
        var clickedElement = $(event.target)
          , publications;

        event.preventDefault();
        if (history.replaceState) {
          history.replaceState(null, null, '#');
        }
        else {
          document.location.href = '/';
        }

        // Marks selected element as "active"
        $("#main-sidebar .sidebar-options button").removeClass("active");
        clickedElement.addClass("active");

        publications = this.getFilteredPublications(clickedElement.data("publication-type"));

        publicationsList.displayPublications(publications);
        publicationsMap.displayPublications(publications);
        this.displaySidebarElement(publicationsList);
      }.bind(this));

      this.hashChanged();
    },
    getFilteredPublications: function (publicationType) {
      var publications = [];

      // Filter publications and display valid ones
      config.publications.forEach(function (publication) {
        if (publicationType === "all" || publicationType === publication.publication_type) {
          publications.push(publication);
        }
      });

      return publications;
    },
    displaySidebarElement: function (sidebarItem) {
      $("#main-sidebar .sidebar-item").hide();
      sidebarItem.$el.show();
    },
    hashChanged: function () {
      var newHash = document.location.hash
        , hashMatch
        , publications = config.publications
        , i, len;

      // Refresh pets filter
      $("#main-sidebar .sidebar-options button").removeClass("active");
      publicationsList.displayPublications(publications);
      // Deactivate form
      publicationForm.deactivate();

      if (newHash === "#publication-new") {
        if (config.userSignedIn) {
          publicationForm.activate();
          this.displaySidebarElement(publicationForm);
        }
        else {
          ajaxSignup.signIn();
        }
      }
      else if (hashMatch = newHash.match(/publication-(\d+)/)) {
        for (i = 0, len = publications.length; i < len; i++) {
          if (publications[i].id === hashMatch[1]) {
            publicationDetail.showPublication(publications[i]);
            this.displaySidebarElement(publicationDetail);
            publicationsMap.highlightPublication(publications[i]);
            break;
          }
        }
      }
      else {
        // Display 'all'
        publicationsList.displayPublications(config.publications);
        publicationsMap.displayPublications(config.publications);
        this.displaySidebarElement(publicationsList);
      }
    }
  };
});
