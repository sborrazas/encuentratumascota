class AddAttachmentsTable < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.integer :publication_id, null: false
      t.string :image, null: false
    end
  end
end
