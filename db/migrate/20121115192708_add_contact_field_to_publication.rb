class AddContactFieldToPublication < ActiveRecord::Migration
  def change
    add_column :publications, :contact, :string, null: false, default: ''
  end
end
