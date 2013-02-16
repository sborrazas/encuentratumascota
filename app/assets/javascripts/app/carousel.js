define(["jquery"], function($) {

  /**
   *
   */
  var ETMCarousel = function (config) {
    this.$slider = $(config.element);
    this.transitionTime = config.transitionTime || 1000;
    this.stopTime = config.stopTime || 4000;

    this.$slides = this.$slider.find("li");

    this.init();
  };

  ETMCarousel.prototype.init = function () {
    this.$slides.fadeOut();

    this.activeSlide(0);

    this._interval = setInterval(function () {
      var newIndex = (this.activeIndex + 1) % this.$slides.length;
      this.activeSlide(newIndex);
    }.bind(this), this.transitionTime + this.stopTime);
  };

  ETMCarousel.prototype.activeSlide = function (index) {
    if (this.$activeSlide) {
      this.$activeSlide.fadeOut(this.transitionTime);
      this.$activeSlide.removeClass("active");
    }

    this.activeIndex = index;

    this.$activeSlide = $(this.$slides.get(this.activeIndex));

    this.$activeSlide.addClass("active");
    this.$activeSlide.fadeIn(this.transition_time);
  };

  return ETMCarousel;

});
