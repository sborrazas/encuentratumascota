class Publication < ActiveRecord::Base
  belongs_to :pet
  belongs_to :publicationType
  belongs_to :city
  attr_accessible :age, :date, :description, :email, :lat, :lng, :name, :phone, :reward, :status
end
