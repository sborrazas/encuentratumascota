class City < ActiveRecord::Base
  belongs_to :country
  attr_accessible :lat, :lng, :name
end
