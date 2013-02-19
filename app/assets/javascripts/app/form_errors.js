define(['jquery'], function ($) {

  /**
   *
   */
  var errorHtml = function (fieldErrors) {
    var errors = ''
      , i = 0
      , len = fieldErrors.length;

    for (; i < len; i += 1) {
      errors += '<p>' + fieldErrors[i] + '</p>';
    }
    return '<div class="error-message">' + errors + '</div>';
  };

  /**
   *
   */
  var clearErrors = function (options) {
    var form = options.form;

    form.find('.error-message').remove();
    form.find('.error').removeClass('error');
  };

  return {
    clearErrors: clearErrors,
    display: function (options) {
      var errors = options.errors || []
        , form = options.form
        , namespace = options.namespace;

      clearErrors({ form: form });

      $.each(errors, function (field, fieldErrors) {
        var fieldName = namespace + "[" + field + "]";

        form.find('[name^="' + fieldName +'"]')
          .parent()
            .addClass('error') // target <p> tag above
            .before(errorHtml(fieldErrors));
      });
    }
  };
});
