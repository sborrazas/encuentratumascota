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

  def current_country
    return @current_country if @current_country

    if session[:country_id]
      if (country = Country.where(id: session[:country_id]).first)
        @current_country = country
        return @current_country
      end
    end

    current_country_code = request.location && request.location.country_code
    country = \
      (current_country_code && Country.where(code: current_country_code).first) ||
      Country.where(code: Country::DEFAULT_COUNTRY_CODE).first

    session[:country_id] = country.id

    @current_country = country
  end
  helper_method :current_country

  private

  def handle_exception(exception)
    NotificationMailer.send_error_email(exception, env).deliver!
    render file: 'public/500.html', status: 500, layout: false
  end
end
