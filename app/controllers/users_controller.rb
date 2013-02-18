class UsersController < ApplicationController

  before_filter :require_current_user
  respond_to :json

  def update
    user_form = Forms::UserForm.new(params[:user], resource: current_user)

    if user_form.valid?
      user = user_form.get_resource
      user.save
      render json: Presenters::User.to_json_hash(user), status: :ok
    else
      render json: { errors: user_form.errors }, status: :unprocessable_entity
    end
  end
end
