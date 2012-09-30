class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.find_for_facebook_oauth(request.env['omniauth.auth'], current_user)

    if @user.persisted?
      flash[:success] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Facebook'
      sign_in :user, @user
    end
    redirect_to root_path
  end

  def twitter
    session["devise.twitter_data"] = request.env["omniauth.auth"]
    redirect_to root_path # TODO: Ask for email
  end

  def failure
    # TODO: Send email to admin
    redirect_to root_path, flash: { error: request.env["omniauth.error"].to_s }
  end
end
