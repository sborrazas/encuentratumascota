class SessionsController < ApplicationController

  before_filter :require_guest, except: [:logout]
  before_filter :require_current_user, only: [:logout]
  respond_to :json

  def create
    user = User.authenticate(user_params[:email], user_params[:password])
    if user
      sign_user_in(user)
      render json: Presenters::User.to_json_hash(user), status: :created
    else
      render json: {
        errors: {
          email: [t('models.user.errors.invalid_email')],
          password: [t('models.user.errors.invalid_password')]
        }
      }, status: :unauthorized
    end
  end

  def create_with_omniauth
    auth = request.env['omniauth.auth']
    email = auth.info.email

    if user = User.where(provider: auth.provider, uid: auth.uid).first
      update_user_with_omniauth(user, auth)
    elsif email && !email.empty? && (user = User.where(email: email).first)
      if !user.provider.blank?
        redirect_to root_path, flash: { error: t('sessions.create_with_omniauth.email_taken') }
        return
      else
        update_user_with_omniauth(user)
      end
    else
      user = create_user_with_omniauth(auth)
    end
    sign_user_in(user)

    redirect_to user.is_admin? ? admin_publications_path : root_path, flash: {
      success: t('sessions.create_with_omniauth.logged_in_successfully', provider: auth.provider)
    }
  end

  def failure
    redirect_to root_path, flash: { error: t('sessions.failure.omniauth_error') }
  end

  def logout
    session.delete(:user)
    redirect_to root_path, flash: { error: t('sessions.logout.success') }
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
      provider: auth.provider,
      uid: auth.uid,
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
