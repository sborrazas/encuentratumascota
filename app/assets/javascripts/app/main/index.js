define(['jquery', 'PetFinder'], function ($, PetFinder) {

  return {
    init: function (pins) {
      var p = new PetFinder();
      p.initMap();
      p.addPins(pins);
    }
  };
});
