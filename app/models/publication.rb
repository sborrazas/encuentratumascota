class Publication < ActiveRecord::Base

  # t.string   "pet_name",                         :null => false
  # t.integer  "age"
  # t.text     "description",      :default => "", :null => false
  # t.string   "email",            :default => "", :null => false
  # t.string   "phone",            :default => "", :null => false
  # t.string   "status",                           :null => false
  # t.string   "lat",                              :null => false
  # t.string   "lng",                              :null => false
  # t.string   "reward",           :default => "", :null => false
  # t.datetime "created_at",                       :null => false
  # t.string   "publication_type", :default => "", :null => false
  # t.integer  "user_id",                          :null => false
  # t.integer  "breed_id"

  belongs_to :user
  belongs_to :breed

  STATUS = %w(adoption lost found)

  scope :has_publication_type, lambda {|*ptype| where(publication_type: ptype) }
  scope :has_status, lambda {|*statuses| where(status: statuses) }

  def adoption?
    publication_type == 'adoption'
  end

  def lost?
    publication_type == 'lost'
  end

  def found?
    publication_type == 'found'
  end
end
