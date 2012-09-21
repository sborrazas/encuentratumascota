class AddPublicationTypeFieldOnPublications < ActiveRecord::Migration
  def up
    change_table :publications do |t|
      t.string :publication_type, null: false, default: ''
      t.remove :publication_types_id
    end
    drop_table :publication_types
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
