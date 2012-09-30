class AddPublicationsAndUsersRelation < ActiveRecord::Migration
  def change
    add_column :publications, :user_id, :integer, null: false
  end
end
