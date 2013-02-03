class Breed < ActiveRecord::Base

  has_many :publications

  scope :sorted, order('breeds.name ASC')

  def to_s
    name
  end
end
