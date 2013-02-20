class AddSlugToPublications < ActiveRecord::Migration
  def up
    add_column :publications, :slug, :string
  end

  def down
    remove_column :publications, :slug
  end
end
