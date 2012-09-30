define(['jquery'], function ($) {

  // Private helpers
  var errorHtml = function (fieldErrors) {
    var errors = '';
    for (i = 0; i < fieldErrors.length; i++) {
      errors += '<p>' + fieldErrors[i] + '</p>';
    }
    return '<div class="error-message">' + errors + '</div>';
  }

  return {
    display: function (options) {
      var errors = options.errors || []
        , form = options.form
        , namespace = options.namespace;

      form.find('.error-message').remove();

      $.each(errors, function (field, fieldErrors) {
        var fieldName = namespace + "[" + field + "]";

        form.find('[name="' + fieldName +'"]')
          .parent()
            .addClass('error') // target <p> tag above
            .before(errorHtml(fieldErrors));
      });
    }
  };

});
