class InitialDatabaseSchema < ActiveRecord::Migration
  def change
    create_table :breeds do |t|
      t.string :name, null: false
    end

    create_table :publications do |t|
      t.string :pet_name, null: false
      t.integer :age
      t.text :description, null: false, default: ''
      t.string :phone, null: false, default: ''
      t.string :status, null: false
      t.string :lat, null: false
      t.string :lng, null: false
      t.string :reward, null: false, default: ''
      t.string :publication_type, null: false, default: ''
      t.integer :user_id, null: false
      t.integer :breed_id, null: false
      t.date :lost_on, null: false
      t.datetime :created_at, null: false
    end

    create_table :users do |t|
      t.string :email, null: false, default: ''
      t.string :crypted_password, null: false, default: ''
      t.string :provider, null: false, default: ''
      t.string :uid, null: false, default: ''
      t.datetime :created_at, null: false
    end

    add_index 'users', ['email'], name: 'index_users_on_email', unique: true
  end
end
