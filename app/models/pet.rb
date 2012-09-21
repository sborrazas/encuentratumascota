class Pet < ActiveRecord::Base
  belongs_to :breed
  has_many :publications, dependent: :destroy
end
