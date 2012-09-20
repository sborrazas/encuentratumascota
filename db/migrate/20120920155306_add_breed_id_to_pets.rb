class AddBreedIdToPets < ActiveRecord::Migration
  def change
    change_table :pets do |t|
      t.integer :breed_id
    end
  end
end
