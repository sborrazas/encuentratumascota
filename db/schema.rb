# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130707023729) do

  create_table "attachments", :force => true do |t|
    t.integer "publication_id", :null => false
    t.string  "image",          :null => false
  end

  create_table "breeds", :force => true do |t|
    t.string "name", :null => false
  end

  create_table "contact_info_inquiries", :force => true do |t|
    t.integer  "user_id"
    t.integer  "publication_id"
    t.datetime "created_at"
  end

  create_table "countries", :force => true do |t|
    t.string "code", :limit => 2, :null => false
    t.string "name",              :null => false
    t.string "lat",               :null => false
    t.string "lng",               :null => false
  end

  create_table "newsletter_subscribers", :force => true do |t|
    t.string   "email",      :null => false
    t.datetime "created_at", :null => false
  end

  create_table "publications", :force => true do |t|
    t.string   "pet_name",                         :null => false
    t.integer  "age"
    t.text     "description",      :default => "", :null => false
    t.string   "phone",            :default => "", :null => false
    t.string   "status",                           :null => false
    t.string   "lat",                              :null => false
    t.string   "lng",                              :null => false
    t.string   "reward",           :default => "", :null => false
    t.string   "publication_type", :default => "", :null => false
    t.integer  "user_id",                          :null => false
    t.integer  "breed_id"
    t.date     "lost_on",                          :null => false
    t.datetime "created_at",                       :null => false
    t.string   "contact",          :default => "", :null => false
    t.string   "sex",              :default => "unknown", :null => false
    t.string   "slug"
    t.integer  "country_id",                              :null => false
  end

  add_index "publications", ["slug"], :name => "slug_index_on_publications", :unique => true

  create_table "users", :force => true do |t|
    t.string   "email",            :default => "", :null => false
    t.string   "crypted_password", :default => "", :null => false
    t.string   "provider",         :default => "", :null => false
    t.string   "uid",              :default => "", :null => false
    t.datetime "created_at",                       :null => false
    t.boolean  "is_admin",         :default => false, :null => false
    t.string   "provider_username", :default => "",    :null => false
    t.string   "image_url",         :default => "",    :null => false
    t.string   "private_username",  :default => "",    :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email"

end
