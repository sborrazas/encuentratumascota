class SessionsController < ApplicationController

  before_filter :require_guest, except: [:logout]
  respond_to :json

  def create
    user = User.authenticate(user_params[:email], user_params[:password])
    if user
      sign_user_in(user)
      render json: Presenters::User.to_json_hash(user), status: :created
    else
      render json: {
        errors: { email: ['is invalid'], password: ['is invalid'] } # TODO I18n
      }, status: :unauthorized
    end
  end

  def create_with_omniauth
    auth = request.env['omniauth.auth']
    if user = User.where(provider: auth.provider, uid: auth.uid).first
      update_user_with_omniauth(user, auth)
    else
      user = create_user_with_omniauth(auth)
    end
    sign_user_in(user)

    redirect_to user.is_admin? ? admin_publications_path : root_path, flash: { success: "Logged in with #{auth.provider} successfully!" }
  end

  def failure
    redirect_to root_path, flash: { error: 'An error occurred while trying to sign in with Omniauth' }
  end

  def logout
    require_current_user
    session.delete(:user)
    redirect_to root_path, flash: { error: 'Sesion cerrada correctamete..' }
  end

  private
  def create_user_with_omniauth(auth)
    User.create({
      provider: auth.provider,
      uid: auth.uid,
      email: auth.info.email || '',
      provider_username: auth.info.nickname || '',
      image_url: auth.info.image || ''
    })
  end

  def update_user_with_omniauth(user, auth)
    user.update_attributes({
      provider_username: auth.info.nickname.blank? ? user.provider_username : auth.info.nickname,
      email: auth.info.email.blank? ? user.email : auth.info.email,
      image_url: auth.info.image.blank? ? user.image_url : auth.info.image
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
