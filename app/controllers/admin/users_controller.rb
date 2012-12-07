class Admin::UsersController < ApplicationController

  before_filter :require_admin
  layout 'admin'

  def index
    @users = User.all
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    user_validator = Forms::UserForm.new(user_params, context: :admin, resource: @user)

    if user_validator.valid?
      @user.update_attributes(user_params)
      redirect_to admin_users_path, flash: { success: 'User updated successfully' }
    else
      @user.assign_attributes(user_params)
      render :edit
    end
  end

  private

  def user_params
    params[:user].slice(*user_attribute_keys)
  end

  def user_attribute_keys
    %w(email is_admin).map(&:to_sym)
  end
end
