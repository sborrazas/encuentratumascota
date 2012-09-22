class User < ActiveRecord::Base

  has_many :publications, dependent: :destroy

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

end
