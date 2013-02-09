class AddSexToPublications < ActiveRecord::Migration
  def change
    add_column :publications, :sex, :string, null: false, default: 'unknown'
  end
end
