class AddNewsletterSubscribersTable < ActiveRecord::Migration
  def up
    create_table :newsletter_subscribers do |t|
      t.string :email, null: false
      t.datetime :created_at, null: false
    end
  end

  def down
    drop_table :newsletter_subscribers
  end
end
