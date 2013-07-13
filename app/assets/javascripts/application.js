define(['jquery'], function ($) {

  return {
    init: function () {
      $(".dropdown-nav").each(function (index, dropdown) {
        var $dropdown = $(dropdown)
          , $toggler = $dropdown.find(".dropdown-toggle")
          , $menu = $dropdown.find(".dropdown-list")
          , activate = function () {
            $toggler.addClass('active');
            $menu.show();
            $menu.width($dropdown.width());
          };

        if ($toggler.hasClass("hover-activation")) {
          $toggler.mouseover(activate);
        }
        else {
          $toggler.click(function (event) {
            event.preventDefault();
            activate();
          });
        }

        $menu.mouseleave(function (event) {
          $menu.hide();
          $toggler.removeClass('active');
        });
      });
    }

  };
});
