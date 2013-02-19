class AddPrivateUsernameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :private_username, :string, null: false, default: ''
  end
end
