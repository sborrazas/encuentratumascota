class Publication < ActiveRecord::Base
  belongs_to :pet
  belongs_to :city

  scope :has_publication_type, lambda {|*ptype| where(publication_type: ptype) }

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
