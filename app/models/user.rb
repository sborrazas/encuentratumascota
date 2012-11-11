class User < ActiveRecord::Base

  include Shield::Model

  has_many :publications, dependent: :destroy

  def self.fetch(email)
    self.find_by_email(email)
  end
end
