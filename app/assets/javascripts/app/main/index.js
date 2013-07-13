define(["jquery", "app/main/ajax_signup", "app/main/publications_map", "app/main/publications_list",
  "app/main/publication_detail", "app/main/publication_form", "app/flash_display", "app/translations",
  "app/main/email_request", "app/main/router"],
  function ($, AjaxSignUp, PublicationsMap, PublicationsList, PublicationDetail, PublicationForm,
    flash, translations, EmailRequest, router) {

  var config = {}
    , petFinder, ajaxSignup, publicationsList, publicationsMap, publicationDetail, publicationForm
    , emailRequest;

  return {
    init: function (settings) {
      config = settings;

      translations.init(config.translations);

      // Flash messages
      flash.displayMessages(config.flash);

      // Ajax signup
      ajaxSignup = new AjaxSignUp({
        userSignedIn: config.userSignedIn
      });

      // Email Request
      emailRequest = new EmailRequest({
        userSignedIn: config.userSignedIn,
        userHasEmail: config.userHasEmail
      });

      // Publications & GMaps handler
      publicationsMap = new PublicationsMap({
        initial: config.country
      });

      // Publications sidebar list
      publicationsList = new PublicationsList();

      // Publications form handler
      publicationForm = new PublicationForm({
        map: publicationsMap,
        successfulPublication: function (publication) {
          config.publications.push(publication);
          router.pushState("filter", "all");
          flash.displayMessage("success", translations("publication_form.publication_created_successfully"));
        }
      });

      // Publication detail
      publicationDetail = new PublicationDetail(ajaxSignup);

      // Bind click event to refresh publications
      $("#main-sidebar .sidebar-options button").click(function (event) {
        var publicationType = $(event.target).data("publication-type");
        event.preventDefault();
        router.pushState('filter', publicationType);
      }.bind(this));

      router.registerRoute(/\/s\/(\w+)/, function (publicationType) {
        this.showPublicationList(publicationType);
        publicationForm.deactivate();
        $("body").addClass("with-sidebar");
      }.bind(this));

      router.registerRoute(/\/p\/([\w\-]+)/, function (publicationSlug) {
        this.showPublicationList("all");
        this.showPublicationDetail(publicationSlug);
        publicationForm.deactivate();
        $("body").addClass("with-sidebar");
      }.bind(this));

      router.registerRoute(/\/p\/new/, function () {
        this.showPublicationForm();
        $("body").addClass("with-sidebar");
      }.bind(this));

      // Bind sidebar toggle event
      $(".sidebar-toggle").click(function (event) {
        event.preventDefault();
        $("body").toggleClass("with-sidebar");
        publicationsMap.resize();
      });

      router.start({
        blankUrl: "/s/all"
      });
    },
    displaySidebarElement: function (sidebarItem) {
      $("#main-sidebar .sidebar-item").hide();
      sidebarItem.$el.show();
    },
    showPublicationForm: function () {
      if (config.userSignedIn) {
        publicationForm.activate();
        this.displaySidebarElement(publicationForm);
      }
      else {
        ajaxSignup.signIn();
      }
    },
    showPublicationDetail: function (publicationSlug) {
      this.fetchPublications(function (publications) {
        var i = 0
          , len = publications.length;

        for (; i < len; i += 1) {
          if (publications[i].slug === publicationSlug) {
            publicationDetail.showPublication(publications[i]);
            this.displaySidebarElement(publicationDetail);
            publicationsMap.highlightPublication(publications[i]);
            return;
          }
        }

        flash.displayMessage("error", translations("publication_detail.deleted"));
      }.bind(this));
    },
    showPublicationList: function (publicationType) {
      this.fetchPublications(function (allPublications) {
        var publications = [];

        publicationForm.deactivate();

        // Filter publications and display valid ones
        if (publicationType === "all") {
          publications = allPublications;
        }
        else {
          allPublications.forEach(function (publication) {
            if (publicationType === publication.publication_type) {
              publications.push(publication);
            }
          });
        }

        // Marks selected element as "active"
        $("#main-sidebar .sidebar-options button").removeClass("active");
        $("#main-sidebar .sidebar-options button[data-publication-type='" + publicationType + "']")
          .addClass("active");

        publicationsList.displayPublications(publications);
        publicationsMap.displayPublications(publications);
        this.displaySidebarElement(publicationsList);
      }.bind(this));
    },
    fetchPublications: function (callback) {
      if (config.publications) {
        callback(config.publications);
      }
      else {
        $.get("/publications", function (publications) {
          config.publications = publications;
          callback(publications);
        });
      }
    }
  };
});
