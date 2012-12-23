class AddProviderUsernameToUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.string :provider_username, null: false, default: ''
    end
  end
end
