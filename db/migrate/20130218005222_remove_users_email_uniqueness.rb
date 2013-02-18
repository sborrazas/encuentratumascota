class RemoveUsersEmailUniqueness < ActiveRecord::Migration
  def up
    remove_index :users, name: 'index_users_on_email'
    add_index :users, ['email'], name: 'index_users_on_email'
  end

  def down
    remove_index :users, name: 'index_users_on_email'
    add_index :users, ['email'], name: 'index_users_on_email', unique: true
  end
end
