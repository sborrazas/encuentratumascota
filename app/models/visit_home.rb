class VisitHome < ActiveRecord::Base
  attr_accessible :lat, :lng
   validates_uniqueness_of :lat, :scope => :lng
end
