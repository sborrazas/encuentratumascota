class PopulatePublicationsSlugWithId < ActiveRecord::Migration
  def up
    ActiveRecord::Base.connection.execute(%Q(
      UPDATE publications SET slug = CAST(id AS VARCHAR(255))
    ))
    add_index :publications, [:slug], name: :slug_index_on_publications, unique: true
  end

  def down
    remove_index :publications, name: :slug_index_on_publications
  end
end
