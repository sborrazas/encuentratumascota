class RemoveTypeFromPets < ActiveRecord::Migration
  def up
    remove_column :pets, :type
  end

  def down
    add_column :pets, :type, :string
  end
end
