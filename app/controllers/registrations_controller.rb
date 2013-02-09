class RegistrationsController < ApplicationController

  before_filter :require_guest
  respond_to :json

  def create
    user_form = Forms::UserForm.new(user_params)

    if user_form.valid?
      user = User.create(user_params)
      session[:user] = user.id
      render json: Presenters::User.to_json_hash(user), status: :created
    else
      render json: { errors: user_form.errors }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    return {} unless params[:user].kind_of?(Hash)
    params[:user].slice(:email, :password)
  end
end
