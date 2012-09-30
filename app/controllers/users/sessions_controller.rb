class Users::SessionsController < Devise::SessionsController

  respond_to :json

  def create
    if warden.authenticate?(scope: resource_name)
      resource = warden.authenticate(scope: resource_name)

      scope = Devise::Mapping.find_scope!(resource_name)
      sign_in(scope, resource)

      render json: {
        status: :success
      }
    else
      render json: {
        status: :error,
        errors: { email: ['Invalid email or password'], password: ['Invalid email or password'] }
      }, status: :unauthorized
    end
  end
end
