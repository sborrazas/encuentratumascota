class ApplicationController < ActionController::Base

  protect_from_forgery

  def current_user
    @current_user ||= User.find(session[:user]) if session[:user]
  end
  helper_method :current_user
end
