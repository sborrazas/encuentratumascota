class AddContactInfoInquiryTable < ActiveRecord::Migration
  def up
    create_table :contact_info_inquiries do |t|
      t.integer :user_id
      t.integer :publication_id
      t.datetime :created_at
    end
  end

  def down
    drop_table :contact_info_inquiries
  end
end
