class ApplicationController < ActionController::Base

  protect_from_forgery

  def current_user
    @current_user ||= User.find(session[:user]) if session[:user]
  end
  helper_method :current_user

  def require_current_user
    unauthorized_request unless current_user
  end

  def require_guest
    unauthorized_request if current_user
  end

  def require_admin
    unauthorized_request unless current_user && current_user.is_admin?
  end

  def unauthorized_request
    respond_to do |format|
      format.json { render nothing: true, status: :unauthorized }
      format.html { redirect_to root_url, flash: { error: 'You are not authorized to access this page' } }
    end
  end

  unless Rails.application.config.consider_all_requests_local
    rescue_from Exception, with: :handle_exception
  end

  private
  def handle_exception(exception)
    # ErrorMailer.experror(exception, env).deliver
    render file: 'public/500.html', status: 500, layout: false
  end
end
