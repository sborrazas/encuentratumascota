class Country < ActiveRecord::Base
  attr_accessible :iso, :lat, :lng, :name
end
