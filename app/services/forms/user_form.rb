module Forms
  class UserForm < Forms::Base
    def process_errors(params, options)
      errors = default_errors_hash
      error_translations = t('models.user.errors')

      if params[:email].blank? || /\A[\w.%+-]+@[\w.-]+\.[a-z]+\z/i !~ params[:email]
        errors[:email] << error_translations[:invalid_email]
      elsif User.find_by_email(params[:email])
        errors[:email] << error_translations[:already_used_email]
      end
      errors[:password] << error_translations[:invalid_password] if params[:password].blank?

      errors
    end
  end
end
