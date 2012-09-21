class VisitHome < ActiveRecord::Base
  validates_uniqueness_of :lat, :scope => :lng
end
