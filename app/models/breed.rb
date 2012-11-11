class Breed < ActiveRecord::Base

  has_many :publications

  def to_s
    name
  end
end
