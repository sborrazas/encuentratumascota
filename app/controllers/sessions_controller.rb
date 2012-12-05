class SessionsController < ApplicationController

  before_filter :require_guest
  respond_to :json

  def create
    user = User.authenticate(user_params[:email], user_params[:password])
    if user
      sign_user_in(user)
      render json: user.attributes.slice(:email, :created_at, :provider), status_code: :created
    else
      render json: {
        errors: { email: ['is invalid'], password: ['is invalid'] }
      }, status: :unauthorized
    end
  end

  def create_with_omniauth
    auth = request.env['omniauth.auth']
    user = User.where(provider: auth.provider, uid: auth.uid).first || create_user_with_omniauth(auth)
    sign_user_in(user)

    redirect_to root_path, flash: { success: "Logged in with #{auth.provider} successfully!" }
  end

  def failure
    redirect_to root_path, flash: { error: "An error occurred while trying to sign in with Omniauth" }
  end

  private
  def create_user_with_omniauth(auth)
    User.create({
      provider: auth.provider,
      uid: auth.uid,
      email: auth.info.email || ''
    })
  end

  def user_params
    return {} unless params[:user].kind_of?(Hash)
    params[:user].slice(:email, :password)
  end

  def sign_user_in(user)
    session[:user] = user.id
  end
end
