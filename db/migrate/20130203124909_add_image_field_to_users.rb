class AddImageFieldToUsers < ActiveRecord::Migration
  def up
    add_column :users, :image_url, :string, null: false, default: ''
  end

  def down
    remove_column :users, :image_url
  end
end
