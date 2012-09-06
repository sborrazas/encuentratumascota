class CreatePublications < ActiveRecord::Migration
  def change
    create_table :publications do |t|
      t.string :name
      t.date :date
      t.integer :age
      t.references :pet
      t.text :description
      t.text :email
      t.text :phone
      t.references :publication_types
      t.string :status
      t.references :city
      t.string :lat
      t.string :lng
      t.string :reward

      t.timestamps
    end
    add_index :publications, :pet_id
    add_index :publications, :publication_types_id
    add_index :publications, :city_id
  end
end
