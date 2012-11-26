class RegistrationsController < ApplicationController

  authorize_resource
  respond_to :json

  def create
    user_validator = Validators::UserValidator.new(user_params)

    if user_validator.valid?
      @user = User.create(user_params)
      render json: @user.attributes.slice(:email, :created_at, :provider), status: :created
    else
      render json: { errors: user_validator.errors }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    return {} unless params[:user].kind_of?(Hash)
    params[:user].slice(:email, :password)
  end
end
