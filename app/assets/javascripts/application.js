define(['jquery'], function ($) {

  return {
    init: function () {
      var dropdown = $('ul.nav-dropdown-menu')
        , link = dropdown.prev('a')
        , parent = link.parent();

      dropdown.mouseleave(function (event) {
        dropdown.hide();
        link.removeClass('active');
      });

      link.click(function (event) {
        event.preventDefault();

        link.addClass('active');
        dropdown.show();
        dropdown.width(parent.width());
      });
    }
  };
});
