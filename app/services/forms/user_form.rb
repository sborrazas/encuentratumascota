module Forms
  class UserForm < Forms::Base
    def process_errors(params)
      errors = default_errors_hash

      if params[:email].blank? || /\A[\w.%+-]+@[\w.-]+\.[a-z]+\z/i !~ params[:email]
        errors[:email] << 'is invalid'
      elsif User.find_by_email(params[:email])
        errors[:email] << 'is already in use'
      end
      errors[:password] << 'is invalid' if params[:password].blank?

      errors
    end
  end
end
