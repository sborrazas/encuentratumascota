class Country < ActiveRecord::Base

  has_many :publications

  DEFAULT_COUNTRY_CODE = 'UY'

end
