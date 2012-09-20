class Country < ActiveRecord::Base
  attr_accessible :id,:iso, :lat, :lng, :name
end
