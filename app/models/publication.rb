class Publication < ActiveRecord::Base
  belongs_to :pet
  belongs_to :city
  attr_accessible :publicationType_id,:age, :date, :description, :email, :lat, :lng, :name, :phone, :reward, :status,:pet_id,:city_id
end
