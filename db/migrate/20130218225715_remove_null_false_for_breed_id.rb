class RemoveNullFalseForBreedId < ActiveRecord::Migration
  def up
    change_column :publications, :breed_id, :integer, null: true
  end

  def down
    change_column :publications, :breed_id, :integer, null: false
  end
end
