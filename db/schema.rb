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

ActiveRecord::Schema.define(:version => 20120906182423) do

  create_table "breeds", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "cities", :force => true do |t|
    t.string   "name"
    t.string   "lat"
    t.string   "lng"
    t.integer  "country_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "cities", ["country_id"], :name => "index_cities_on_country_id"

  create_table "countries", :force => true do |t|
    t.string   "name"
    t.string   "iso"
    t.string   "lat"
    t.string   "lng"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "pets", :force => true do |t|
    t.string   "type"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "publication_types", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "publications", :force => true do |t|
    t.string   "name"
    t.date     "date"
    t.integer  "age"
    t.integer  "pet_id"
    t.text     "description"
    t.text     "email"
    t.text     "phone"
    t.integer  "publication_types_id"
    t.string   "status"
    t.integer  "city_id"
    t.string   "lat"
    t.string   "lng"
    t.string   "reward"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
  end

  add_index "publications", ["city_id"], :name => "index_publications_on_city_id"
  add_index "publications", ["pet_id"], :name => "index_publications_on_pet_id"
  add_index "publications", ["publication_types_id"], :name => "index_publications_on_publication_types_id"

end
