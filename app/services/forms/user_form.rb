module Forms
  class UserForm < Forms::Base
    def process_errors(params, options)
      errors = default_errors_hash
      error_translations = I18n.t('models.user.errors')
      resource = options.fetch(:resource, nil)

      if params[:email].blank? || /\A[\w.%+-]+@[\w.-]+\.[a-z]+\z/i !~ params[:email]
        errors[:email] << error_translations[:invalid_email]
      elsif User.find_by_email(params[:email])
        errors[:email] << error_translations[:already_used_email]
      end
      if params[:password].blank? && resource.try(:crypted_password).blank? && resource.try(:uid).blank?
        errors[:password] << error_translations[:invalid_password]
      end
      if params[:private_username].blank?
        errors[:private_username] << error_translations[:blank_private_username]
      end

      errors
    end

    def build_resource(params, options)
      context = options.fetch(:context, :default)
      user = options.fetch(:resource) { User.new }

      valid_params = params.slice(*param_keys)

      user.assign_attributes(valid_params)

      user
    end

    def param_keys
      [:email]
    end
  end
end
